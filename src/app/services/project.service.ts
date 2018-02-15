import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';
import { ElectronService } from 'ngx-electron';
import { InputStream, InputStreamData } from '../model/input-stream.model';
import { Path } from '../utils/node';
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
  } else {
      this.theProject = sampleProject;
    }
  }

}
