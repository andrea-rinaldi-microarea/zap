import { ElectronService } from 'ngx-electron';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project.model';
import { Entity } from '../model/entity.model';
import { InputStream } from '../model/input-stream.model';
import { Path } from '../utils/node';

@Component({
  selector: 'zap-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public projectName:string = "";

  constructor(
    private router: Router, 
    private projectService: ProjectService,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.projectService.theProject = new Project(this.projectName);
    this.router.navigateByUrl('/edit');
  }

  onOpen() {
    if (this.electronService.isElectronApp) {
      var files = this.electronService.remote.dialog.showOpenDialog({
        title:'Open a Project', 
        filters:[
          {name: 'Zap Projects', extensions: ['zapproj']},
          {name: 'All Files', extensions: ['*']}
        ]
      });
      if (files) {
        this.projectService.load(files[0]);
      } else {
        return;
      }
    } else {
      this.projectService.load("");
    }    
    this.router.navigateByUrl('/edit');
  }

}
