import { Component, OnInit } from '@angular/core';
import { CurrentJobService } from '../current-job.service';
import { InputStreamService } from '../../services/input-stream.service';

@Component({
  selector: 'zap-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  constructor(
    private currJobService: CurrentJobService,
    private inputStreamService: InputStreamService
  ) { }

  ngOnInit() {
  }

  onLoadStream() {
    this.currJobService.loadSample();
  }
}
