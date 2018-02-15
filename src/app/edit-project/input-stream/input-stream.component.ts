import { InputStream, InputStreamData } from './../../model/input-stream.model';
import { InputStreamService } from './../../services/input-stream.service';
import { Component, OnInit } from '@angular/core';
import { CurrentJobService } from '../current-job.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'zap-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  sample: InputStreamData = { data: [] };

  constructor(
    private currJobService: CurrentJobService, 
    private projectService: ProjectService,
    public inputStreamService: InputStreamService
  ) { }

  ngOnInit() {
  }

  onLoadStream() {
    var data = this.projectService.samples.get(this.currJobService.job);
    if (!data)
      data = { data: [] };
    this.inputStreamService.load(
      this.currJobService.job.stream,
      data,
      15
    );
    this.projectService.samples.set(this.currJobService.job, data);
    this.sample = data;
  }
}
