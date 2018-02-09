import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../model/job.model';
import { CurrentJobService } from '../current-job.service';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'zap-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  constructor(private currJobService: CurrentJobService, private entitiesService: EntitiesService) { }

  ngOnInit() {
  }

}
