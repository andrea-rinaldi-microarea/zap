import { Mapping } from './../model/mapping.model';
import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';
import { ElectronService } from 'ngx-electron';
import { InputStream, InputStreamData } from '../model/input-stream.model';
import { Path, Fs } from '../utils/node';
import { Job } from '../model/job.model';

const sampleProject: Project = {
  name: "Arivata",
  filePath: "./Arivata.zapproj",
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

@Injectable()
export class ProjectService {

  public theProject: Project = new Project("");
  samples: Map<Job, InputStreamData> = new Map<Job, InputStreamData>();
  lastError: string = "";

  constructor(private electronService: ElectronService) { }

  load(filePath: string): boolean {
    this.lastError="";
    if (this.electronService.isElectronApp) {
      this.theProject.filePath = filePath;
      this.theProject.name = Path.basename(filePath, '.zapproj');
      try {
        var fileContent = Fs.readFileSync(this.theProject.filePath, 'utf8'); 
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
        Fs.writeFileSync(this.theProject.filePath, strProj);
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

}
