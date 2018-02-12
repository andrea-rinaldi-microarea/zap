import { ElectronService } from 'ngx-electron';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project.model';
import { Entity } from '../model/entity.model';
import { InputStream } from '../model/input-stream.model';

const sampleProject: Project = {
  name: "Arivata",
  pathName: "./Arivata.zapproj",
  sourceFolder: "",
  targetFolder: "",
  jobs: [ {
    targetEntityName: "MA_Items",
    mappings: [],
    stream: new InputStream()
  },
  {
    targetEntityName: "MA_CustSupp",
    mappings: [],
    stream: new InputStream()
  }]
}

declare const path;

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
        console.log(path.basename(files[0], '.zapproj'));
        this.projectService.theProject.pathName = files[0];
        this.projectService.theProject.name = path.basename(files[0], '.zapproj');
        this.router.navigateByUrl('/edit');
      }
    } else {
      this.projectService.theProject = sampleProject;
      this.router.navigateByUrl('/edit');
    }    
  }

}
