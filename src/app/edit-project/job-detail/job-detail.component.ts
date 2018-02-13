import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Job } from '../../model/job.model';
import { CurrentJobService } from '../current-job.service';
import { EntitiesService } from '../../services/entities.service';
import { Entity } from '../../model/entity.model';
import { Mapping } from '../../model/mapping.model';
import { Column } from '../../model/column.model';
import { AllRules } from '../../model/rule.model';

@Component({
  selector: 'zap-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  entity: Entity;
  selectedColumnName: string;
  allRules: string[];
  curr: Mapping;
  
  @HostListener('document:click', ['$event']) clickedOutside($event){
    this.curr = null;
  }
  
  constructor(private currJobService: CurrentJobService, private entitiesService: EntitiesService) { 
    this.allRules = AllRules;
  }

  ngOnInit() {
  }

  onTargetEntityChanged($event: any) {
    this.entitiesService.loadColumns($event);
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

  clickedInRow($event: Event, mapping: Mapping){
    $event.preventDefault();
    $event.stopPropagation(); 
    if (this.curr == mapping) {
      this.curr = null;
    } else {
      this.curr = mapping;
    }
  }

  clickedInColumn($event: Event){
    $event.preventDefault();
    $event.stopPropagation(); 
  }

  ruleDescription(mapping: Mapping): string {
    //{{mapping.sourceColumn ? currJobService.job.stream.columns[mapping.sourceColumn].name : "[not set]"}}
    if (mapping.rule == 'Fixed') {
      return mapping.fixedValue ? mapping.fixedValue : "[empty]"; 
    } else if (mapping.rule == 'Copy') {
      return mapping.sourceColumn >= 0 ? this.currJobService.job.stream.columns[mapping.sourceColumn].name : "[not set]"
    }
    return "[not set]";
  }
}
