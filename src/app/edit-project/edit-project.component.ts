import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Job } from '../model/job.model';
import { CurrentJobService } from './current-job.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'zap-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers: [ CurrentJobService ]
})
export class EditProjectComponent implements OnInit {

  constructor(
    private router: Router, 
    private projectService: ProjectService, 
    private currJobService: CurrentJobService,
    private electronService: ElectronService,
    private changeDetector: ChangeDetectorRef
  ) { }

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

  onConvert() {

  }

  onBrowseSource() {
    if (this.electronService.isElectronApp) {
      this.electronService.remote.dialog.showOpenDialog({title:'Source Folder', properties: ["openDirectory"] },  (folders) => {
        this.projectService.theProject.sourceFolder = folders[0];
        this.changeDetector.detectChanges();
      });
    }
  }

  onBrowseOutput() {
    if (this.electronService.isElectronApp) {
      this.electronService.remote.dialog.showOpenDialog({title:'Output Folder', properties: ["openDirectory"] },  (folders) => {
        this.projectService.theProject.targetFolder = folders[0];
        this.changeDetector.detectChanges();
      });
    }
  }
}
