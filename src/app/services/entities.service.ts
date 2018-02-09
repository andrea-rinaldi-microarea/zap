import { Injectable } from '@angular/core';
import { Entity } from '../model/entity.model';
import { Type, Column } from '../model/column.model';

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
  
  private catalog: Map<string, Entity> = new Map<string, Entity>();

  constructor() { 
    for (let entity of this.entities) {
      this.catalog.set(entity.name, entity);
    }

    this.get("MA_Items").columns = [
      new Column("Item", Type.String, 21 ),
      new Column("Description", Type.String, 128 ),
      new Column("InternalNote", Type.String, 128 ),
      new Column("ShortDescription", Type.String, 40 ),
      new Column("BasePrice", Type.Money, 0 ),
      new Column("BaseUoM", Type.String, 8 ),
      new Column("IsGood", Type.Bool, 0 )
    ];

    this.get("MA_CustSupp").columns = [
      new Column("CustSuppType", Type.Enum, 0 ),
      new Column("CustSupp", Type.String, 12 ),
      new Column("CompanyName", Type.String, 128 ),
      new Column("ZIPCode", Type.String, 10 ),
      new Column("City", Type.String, 64 )
    ];
  }

  public get(key: string): Entity {
    return this.catalog.get(key);
  }

}
