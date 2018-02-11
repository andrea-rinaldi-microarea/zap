import { InputStream } from './../../model/input-stream.model';
import { InputStreamService } from './../../services/input-stream.service';
import { Component, OnInit } from '@angular/core';
import { CurrentJobService } from '../current-job.service';

@Component({
  selector: 'zap-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  constructor(private currJobService: CurrentJobService, public inputStreamService: InputStreamService) { }

  ngOnInit() {
  }

  onLoadStream() {
    this.inputStreamService.load(
      this.currJobService.job.stream,
      15
    );
  }
}
