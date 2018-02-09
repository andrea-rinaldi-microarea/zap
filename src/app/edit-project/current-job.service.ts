import { Injectable } from '@angular/core';
import { Job } from '../model/job.model';

@Injectable()
export class CurrentJobService {

  job: Job;

  constructor() { }

}
