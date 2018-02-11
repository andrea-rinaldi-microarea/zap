import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Job } from '../model/job.model';
import { CurrentJobService } from './current-job.service';

@Component({
  selector: 'zap-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers: [ CurrentJobService ]
})
export class EditProjectComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService, private currJobService: CurrentJobService) {
  }

  ngOnInit() {
  }

  onClose() {
    this.router.navigateByUrl('/home');
  }

  onSave() {
    for (let job of this.projectService.theProject.jobs) {
      job.stream.sample = [];
    }
    var str = JSON.stringify(this.projectService.theProject);
    this.router.navigateByUrl('/home');
  }

}
