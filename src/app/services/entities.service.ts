import { Injectable } from '@angular/core';
import { Entity } from '../model/entity.model';
import { Type, Column } from '../model/column.model';
import { ElectronService } from 'ngx-electron';
import { Fs, Path } from '../utils/node';

const ENTITIES_REPO = './dist/assets/entities';
@Injectable()
export class EntitiesService {

  public entities: Entity[] = [];
  
  private catalog: Map<string, Entity> = new Map<string, Entity>();

  constructor(private electronService: ElectronService) { 

    if (this.electronService.isElectronApp) {
      var files = Fs.readdirSync(ENTITIES_REPO);
      for (let file of files) {
        this.entities.push(new Entity(Path.basename(file, '.xml')));
      }
      console.log(this.entities);
    } else {
      this.entities.push(new Entity("MA_Items"));
      this.entities.push(new Entity("MA_CustSupp"));
      this.entities.push(new Entity("MA_ProductCtg"));
      this.entities.push(new Entity("MA_HomogeneousCtg"));
      this.entities.push(new Entity("MA_Contacts"));
      this.entities.push(new Entity("MA_CommodityCtg"));
    }

    for (let entity of this.entities) {
      this.catalog.set(entity.name, entity);
    }
  }

  loadColumns(entityName: string) {
    var entity: Entity = this.get(entityName);
    if (!entity) 
      return;
    
    if (this.electronService.isElectronApp) {
    } else {
      if (entity.name === "MA_CustSupp") {
        entity.columns = [
          new Column("CustSuppType", Type.Enum, 0 ),
          new Column("CustSupp", Type.String, 12 ),
          new Column("CompanyName", Type.String, 128 ),
          new Column("ZIPCode", Type.String, 10 ),
          new Column("City", Type.String, 64 )
        ];
      }
      if (entity.name === "MA_Items") {
        entity.columns = [
            new Column("Item", Type.String, 21 ),
            new Column("Description", Type.String, 128 ),
            new Column("InternalNote", Type.String, 128 ),
            new Column("ShortDescription", Type.String, 40 ),
            new Column("BasePrice", Type.Money, 0 ),
            new Column("BaseUoM", Type.String, 8 ),
            new Column("IsGood", Type.Bool, 0 )
        ];
      }
    }
  }

  public get(key: string): Entity {
    return this.catalog.get(key);
  }

}
