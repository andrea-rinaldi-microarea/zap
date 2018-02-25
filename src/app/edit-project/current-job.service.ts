import { Injectable } from '@angular/core';
import { Job } from '../model/job.model';
import { InputStreamData } from '../model/input-stream.model';
import { ProjectService } from '../services/project.service';
import { InputStreamService } from '../services/input-stream.service';
import { MessagesService } from '../services/messages.service';

@Injectable()
export class CurrentJobService {

  job: Job;
  sample: InputStreamData = { data: [] };

  constructor(
    private projectService: ProjectService,
    public inputStreamService: InputStreamService,
    public messagesService: MessagesService
  ) { }

  refreshSample() {
    this.sample = this.projectService.samples.get(this.job);
    if (!this.sample) {
      this.sample = { data: [] };
      if (this.job.stream.name) {
        this.loadSample();
      }
    }
  }

  loadSample() {
    this.messagesService.clear();
    if (!this.inputStreamService.load(
      this.job.stream,
      this.sample,
      15
    )) {
      this.messagesService.error("Failed loading sample: " + this.inputStreamService.lastError);
    } else {
      this.projectService.samples.set(this.job, this.sample);
    }
  }
}
