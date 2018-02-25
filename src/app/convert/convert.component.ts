import { Component, OnInit } from '@angular/core';
import { InputStreamService } from '../services/input-stream.service';
import { ElectronService } from 'ngx-electron';
import { CurrentJobService } from '../edit-project/current-job.service';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { InputStreamData } from '../model/input-stream.model';
import { Rule, Copy, Fixed } from '../model/rule.model';
import { Xml } from '../utils/xml';
import { Fs, Path } from '../utils/node';

@Component({
  selector: 'zap-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {

  constructor(
    private router: Router, 
    private projectService: ProjectService, 
    private electronService: ElectronService,
    private inputStreamService: InputStreamService
  ) { }

  ngOnInit() {
  }

  onBrowseOutput() {
    if (this.electronService.isElectronApp) {
      var folders = this.electronService.remote.dialog.showOpenDialog({title:'Output Folder', properties: ["openDirectory"] });
      if (folders) {
        this.projectService.theProject.targetFolder = folders[0];
      }
    }
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

  onBack() {
    this.router.navigateByUrl('/edit');
  }

}
