import { Component, OnInit } from '@angular/core';
import { CurrentJobService } from '../current-job.service';
import { InputStreamService } from '../../services/input-stream.service';
import { ProjectService } from '../../services/project.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'zap-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  constructor(
    private currJobService: CurrentJobService,
    private inputStreamService: InputStreamService,
    private projectService: ProjectService,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
  }

  onBrowseSource() {
    if (this.electronService.isElectronApp) {
      var files = this.electronService.remote.dialog.showOpenDialog({
        title:'Open a Source', 
        filters:[
          {name: 'CSV files', extensions: ['csv']},
          {name: 'All Files', extensions: ['*']}
        ]
      });
      if (files) {
        this.currJobService.job.stream.name = files[0];
      } else {
        return;
      }
    } else {
      this.currJobService.job.stream.name = "Artikel.csv";
    }    
  }


  onLoadStream() {
    this.currJobService.loadSample();
  }
}
