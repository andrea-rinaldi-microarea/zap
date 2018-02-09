import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectService {

  public theProject: Project = new Project("");

  constructor() { }

}
