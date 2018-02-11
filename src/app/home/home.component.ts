import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project.model';
import { Entity } from '../model/entity.model';
import { InputStream } from '../model/input-stream.model';

const sampleProject: Project = {
  name: "Arivata",
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

@Component({
  selector: 'zap-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public projectName:string = "";

  constructor(private router: Router, private projectService: ProjectService) {
    
  }

  ngOnInit() {
  }

  onCreate() {
    this.projectService.theProject = new Project(this.projectName);
    this.router.navigateByUrl('/edit');
  }

  onOpen() {
    this.projectService.theProject = sampleProject;
    this.router.navigateByUrl('/edit');
  }

}
