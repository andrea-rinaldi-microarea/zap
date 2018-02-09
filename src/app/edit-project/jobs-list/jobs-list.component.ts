import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Job } from '../../model/job.model';
import { CurrentJobService } from '../current-job.service';
import { projection } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'zap-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  constructor(private projectService: ProjectService,  private currJobService: CurrentJobService) { }

  ngOnInit() {
  }

  onAddJob() {
    var n: number = this.projectService.theProject.jobs.push(new Job());
    this.currJobService.job = this.projectService.theProject.jobs[n - 1];
  }

  onDeleteJob(index: number) {
    var deletedJob: Job[] = this.projectService.theProject.jobs.splice(index, 1);
    if (deletedJob[0] == this.currJobService.job) {
      this.currJobService.job = null;
    }

  }

}
