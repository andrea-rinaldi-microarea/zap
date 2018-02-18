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

  constructor(private electronService: ElectronService) { }

  load(filePath: string) {
    if (this.electronService.isElectronApp) {
      this.theProject.filePath = filePath;
      this.theProject.name = Path.basename(filePath, '.zapproj');
      try {
        var fileContent = Fs.readFileSync(this.theProject.filePath, 'utf8'); 
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
        return;
      }
      try {
        this.theProject = JSON.parse(fileContent);
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
        return;
      }
    } else {
      this.theProject = sampleProject;
    }
  }

  save() {
    var strProj = JSON.stringify(this.theProject, null, 2);
    if (this.electronService.isElectronApp) {
      try {
        Fs.writeFileSync(this.theProject.filePath, strProj);
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
      }
    } else {
      console.log(strProj);      
    }
  }

}
