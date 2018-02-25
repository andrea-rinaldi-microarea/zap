import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Job } from '../../model/job.model';
import { CurrentJobService } from '../current-job.service';
import { EntitiesService } from '../../services/entities.service';
import { Entity } from '../../model/entity.model';
import { Mapping } from '../../model/mapping.model';
import { Column, fromColumn, columnTypeDescription } from '../../model/column.model';
import { AllRules } from '../../model/rule.model';
import { EnumsService } from './../../services/enums.service';
import { MessagesService } from '../../services/messages.service';

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
  inAddingColumn: boolean = false;
  
  @HostListener('document:click', ['$event']) clickedOutside($event){
    this.curr = null;
    this.inAddingColumn = false;
  }
  
  constructor(
    private currJobService: CurrentJobService, 
    private entitiesService: EntitiesService,
    private enumsService: EnumsService,
    private messagesService: MessagesService
  ) { 
    this.allRules = AllRules;
  }

  ngOnInit() {
  }

  onAddingColumn($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.curr = null; 
  }

  onAddColumn() {
    var column: Column = fromColumn(this.entity.getColumn(this.selectedColumnName));
    this.currJobService.job.mappings.push(new Mapping(column));
    this.selectedColumnName = null;
  }

  onPrepareEntity() {
    this.messagesService.clear();
    this.entity = this.entitiesService.get(this.currJobService.job.targetEntityName);
    if (!this.entitiesService.loadColumns(this.entity.name)) {
      this.messagesService.error("Failed loading entities: " + this.entitiesService.lastError);
    }
  }

  clickedInRow($event: Event, mapping: Mapping){
    $event.preventDefault();
    $event.stopPropagation(); 
    if (this.curr == mapping) {
      this.curr = null;
    } else {
      this.curr = mapping;
    }
    this.inAddingColumn = false;
  }

  clickedInColumn($event: Event){
    $event.preventDefault();
    $event.stopPropagation(); 
  }

  ruleDescription(mapping: Mapping): string {
    if (mapping.rule == 'Fixed') {
      return mapping.fixedValue ? mapping.fixedValue : "[empty]"; 
    } else if (mapping.rule == 'Copy') {
      return mapping.sourceColumn >= 0 ? this.currJobService.job.stream.columns[mapping.sourceColumn].name : "[not set]"
    }
    return "[not set]";
  }

  typeDescription(col: Column) : string {
    return columnTypeDescription(col)
  }
}
