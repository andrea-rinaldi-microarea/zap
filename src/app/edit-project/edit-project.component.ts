import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Job } from '../model/job.model';
import { CurrentJobService } from './current-job.service';
import { ElectronService } from 'ngx-electron';
import { InputStreamService } from '../services/input-stream.service';
import { Fixed, Rule, Copy } from '../model/rule.model';
import { Xml } from '../utils/xml';
import { Path, Fs } from '../utils/node';
import { InputStreamData } from '../model/input-stream.model';

@Component({
  selector: 'zap-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css', './edit-project.component.scss'],
  providers: [ CurrentJobService ]
})
export class EditProjectComponent implements OnInit {

  constructor(
    private router: Router, 
    private projectService: ProjectService, 
    private currJobService: CurrentJobService,
    private electronService: ElectronService,
    private inputStreamService: InputStreamService
  ) { }

  ngOnInit() {
    this.inputStreamService.loadInputList(this.projectService.theProject.sourceFolder);
  }

  onClose() {
    this.router.navigateByUrl('/home');
  }

  onSave() {
    if (this.electronService.isElectronApp) {
      if (!this.projectService.theProject.filePath) {
        var folders = this.electronService.remote.dialog.showOpenDialog({title:'Output Folder', properties: ["openDirectory"] });
        if (!folders) {
          return;
        }
        this.projectService.theProject.filePath = Path.join(folders[0], this.projectService.theProject.name + '.zapproj');
      }
    }
    this.projectService.save();
    this.router.navigateByUrl('/home');
  }

  matchCondition(column: string, condition: string): boolean {
    if (condition === "empty") {
      return column === "";
    } else if (condition === "not-empty") {
      return column !== "";
    } else {
      return false;
    }
  }

  onConvert() {
    if (this.electronService.isElectronApp) {
      for (let job of this.projectService.theProject.jobs) {
        var output = {
          DataTables : [
          ]
        }
        var content: InputStreamData = { data: []};
        this.inputStreamService.load(job.stream, content);
        for (let row of content.data) {
          if  (
                job.stream.whereColumn && job.stream.whereColumn != -1 &&
                !this.matchCondition(row[job.stream.whereColumn], job.stream.whereCondition)
              ) {
            continue;        
          }
          var record: any = {};
          var attributes: any = {};
          for (let mapping of job.mappings) {
            let rule: Rule = (mapping.rule == "Copy") ? new Copy() :  new Fixed(mapping.fixedValue);
            attributes[mapping.targetColumn.name] = rule.apply(mapping.sourceColumn >= 0 ? row[mapping.sourceColumn] : "", mapping.targetColumn);
          }
          record[job.targetEntityName] = { _attr: attributes };
          output.DataTables.push(record);
        }
        var strOut = Xml.unparse(output, {declaration: { standalone: 'yes', encoding: 'UTF-8' }, indent: true});
        console.log(strOut);

        try {
          Fs.writeFileSync(Path.join(this.projectService.theProject.targetFolder, job.targetEntityName + '.xml'), strOut);
        }
        catch (/** @type {?} */ e) {
          console.log(e); //@@TODO error handling
        }
      }
    }
  }

  onBrowseSource() {
    if (this.electronService.isElectronApp) {
      var folders = this.electronService.remote.dialog.showOpenDialog({title:'Source Folder', properties: ["openDirectory"] });
      if (!folders) 
        return;
      this.projectService.theProject.sourceFolder = folders[0];
      //@TODO ask and clean up all input from jobs
    }
    
    this.inputStreamService.loadInputList(this.projectService.theProject.sourceFolder);
  }

  onBrowseOutput() {
    if (this.electronService.isElectronApp) {
      var folders = this.electronService.remote.dialog.showOpenDialog({title:'Output Folder', properties: ["openDirectory"] });
      if (folders) {
        this.projectService.theProject.targetFolder = folders[0];
      }
    }
  }

  onSourceFolderChanged($event: any) {
    this.inputStreamService.loadInputList($event);
    //@TODO ask and clean up all input from jobs
  }
}
