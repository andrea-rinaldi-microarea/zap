import { Injectable } from '@angular/core';
import { Entity } from '../model/entity.model';

@Injectable()
export class EntitiesService {

  public entities: Entity[] = [
    new Entity("MA_Items"),
    new Entity("MA_ProductCtg"),
    new Entity("MA_HomogeneousCtg"),
    new Entity("MA_CustSupp"),
    new Entity("MA_Contacts"),
    new Entity("MA_CommodityCtg")
  ];
  
  constructor() { }

}
