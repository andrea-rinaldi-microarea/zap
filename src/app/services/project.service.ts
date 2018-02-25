import { Mapping } from './../model/mapping.model';
import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';
import { ElectronService } from 'ngx-electron';
import { InputStream, InputStreamData } from '../model/input-stream.model';
import { Path, Fs } from '../utils/node';
import { Job } from '../model/job.model';

const sampleProject: Project = {
  name: "Arivata",
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

@Injectable()
export class ProjectService {

  public theProject: Project = new Project("");
  public projectFilePath: string = null;
  samples: Map<Job, InputStreamData> = new Map<Job, InputStreamData>();
  lastError: string = "";

  constructor(private electronService: ElectronService) { }

  create(name: string) {
    this.theProject = new Project(name);
    this.projectFilePath = null;
  }

  load(filePath: string): boolean {
    this.lastError="";
    if (this.electronService.isElectronApp) {
      this.projectFilePath = filePath;
      try {
        var fileContent = Fs.readFileSync(this.projectFilePath , 'utf8'); 
      }
      catch (/** @type {?} */ e) {
        console.log(e);
        this.lastError = e.message? e.message : e;
        return false;
      }
      try {
        this.theProject = JSON.parse(fileContent);
      }
      catch (/** @type {?} */ e) {
        console.log(e);
        this.lastError = e.message? e.message : e;
        return false;
      }
    } else {
      this.theProject = sampleProject;
    }
    return true;
  }

  save(): boolean {
    var strProj = JSON.stringify(this.theProject, null, 2);
    if (this.electronService.isElectronApp) {
      try {
        Fs.writeFileSync(this.projectFilePath, strProj);
      }
      catch (/** @type {?} */ e) {
        console.log(e); 
        this.lastError = e.message? e.message : e;
        return false;
      }
    } else {
      console.log(strProj);      
    }
    return true;
  }

  checkComplete(): boolean {
    if (this.theProject.jobs.length < 1) {
      this.lastError = "no jobs defined";
      return false;
    }
    for (let j in this.theProject.jobs) {
      let job = this.theProject.jobs[j];
      if (!job.targetEntityName) {
        this.lastError = "target entity not set for job at position " + (+j + 1);
        return false;
      }
      if (!job.stream || !job.stream.name) {
        this.lastError = "source stream not set at job " + job.targetEntityName;
        return false;
      }
      if (job.mappings.length < 1) {
        this.lastError = "no mappings for job " + job.targetEntityName;
        return false;
      }
      for (let mapping of job.mappings) {
        if (
            !mapping.rule ||
            (mapping.rule == "Copy" && mapping.sourceColumn == null) ||
            (mapping.rule == "Fixed" && mapping.fixedValue == null)
        ) {
          this.lastError = "job " + job.targetEntityName + ", some mappings are incomplete";
          return false;
        }
      }
    }
    return true;
  }

}
