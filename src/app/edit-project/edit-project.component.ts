import { MessagesService } from './../services/messages.service';
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
    private inputStreamService: InputStreamService,
    private messagesServices: MessagesService
  ) { }

  ngOnInit() {
    this.messagesServices.clear();
  }

  onClose() {
    this.router.navigateByUrl('/home');
  }

  onSave() {
    this.messagesServices.clear();
    if (this.electronService.isElectronApp) {
      if (!this.projectService.projectFilePath) {
        var folders = this.electronService.remote.dialog.showOpenDialog({title:'Output Folder', properties: ["openDirectory"] });
        if (!folders) {
          return;
        }
        var newProj = Path.join(folders[0], this.projectService.theProject.name + '.zapproj');
        if (Fs.existsSync(newProj)) {
          this.messagesServices.error('A project named "'+ newProj + '" already exists in the selected folder.');  
          return;
        }
        this.projectService.projectFilePath = newProj;
      }
    } else {
      if (this.projectService.theProject.name == "new") {
        this.messagesServices.error("A project with this name already exists.");
        return;
      }
    }

    if (!this.projectService.save()) {
      this.messagesServices.error("Failed to save the project: " + this.projectService.lastError);
      return;
    }
  }

  onConvert() {
    this.messagesServices.clear();
    if (!this.projectService.checkComplete()) {
      this.messagesServices.error("The project is missing some settings: " + this.projectService.lastError);
      return;
    }
    this.router.navigateByUrl('/convert');
  }
}
