import { Injectable } from '@angular/core';
import { Job } from '../model/job.model';
import { InputStreamData } from '../model/input-stream.model';
import { ProjectService } from '../services/project.service';
import { InputStreamService } from '../services/input-stream.service';

@Injectable()
export class CurrentJobService {

  job: Job;
  sample: InputStreamData = { data: [] };

  constructor(
    private projectService: ProjectService,
    public inputStreamService: InputStreamService
  ) { }

  refreshSample() {
    this.sample = this.projectService.samples.get(this.job);
    if (!this.sample)
      this.sample = { data: [] };
  }

  loadSample() {
    this.inputStreamService.load(
      this.job.stream,
      this.sample,
      15
    );
    this.projectService.samples.set(this.job, this.sample);
  }
}
