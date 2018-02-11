import { InputStream } from './../../model/input-stream.model';
import { InputStreamService } from './../../services/input-stream.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zap-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  inputStreamName: string;
  hasHeaders: boolean;

  constructor(public inputStreamService: InputStreamService) { }

  ngOnInit() {
  }

  onLoadStream() {
    this.inputStreamService.stream = new InputStream(this.inputStreamName, this.hasHeaders);
    this.inputStreamService.load(
      this.inputStreamName,
      this.inputStreamService.stream,
      15
    );
  }
}
