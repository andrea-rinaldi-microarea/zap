import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../model/job.model';
import { CurrentJobService } from '../current-job.service';
import { EntitiesService } from '../../services/entities.service';
import { Entity } from '../../model/entity.model';
import { Mapping } from '../../model/mapping.model';
import { Column } from '../../model/column.model';

@Component({
  selector: 'zap-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  entity: Entity;
  selectedColumnName: string;
  
  constructor(private currJobService: CurrentJobService, private entitiesService: EntitiesService) { }

  ngOnInit() {
  }

  onTargetEntityChanged($event: any) {

  }

  onAddColumn() {
    var column: Column = new Column();
    column.assign(this.entity.getColumn(this.selectedColumnName));
    this.currJobService.job.mappings.push(new Mapping(column));
    this.selectedColumnName = null;
  }

  onPrepareEntity() {
    this.entity = this.entitiesService.get(this.currJobService.job.targetEntityName);
  }

}
