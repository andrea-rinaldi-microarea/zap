import { Injectable } from '@angular/core';
import { Entity } from '../model/entity.model';
import { Type, Column, String2Type } from '../model/column.model';
import { ElectronService } from 'ngx-electron';
import { Fs, Path } from '../utils/node';
import { Xml2jsParser } from '../utils/xml2js';
import { MessagesService } from './messages.service';

const ENTITIES_REPO = './dist/assets/entities';
@Injectable()
export class EntitiesService {

  public entities: Entity[] = [];
  public lastError: string = "";
  
  private catalog: Map<string, Entity> = new Map<string, Entity>();

  constructor(
    private electronService: ElectronService,
    private messagesServices: MessagesService
  ) { 

    if (this.electronService.isElectronApp) {
      try {
        var files = Fs.readdirSync(ENTITIES_REPO);
      }
      catch (e) {
        console.log(e);
        this.messagesServices.error("Failed loading entities: " + e.message? e.message: "");
        return;
      }

      for (let file of files) {
        this.entities.push(new Entity(Path.basename(file, '.xml')));
      }
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

  loadColumns(entityName: string): boolean {
    var entity: Entity = this.get(entityName);
    if (!entity) {
      this.lastError = "No entity found with name: " + entityName;
      return false;      
    }

    if (entity.columns.length > 0)
      return true; // already loaded
    
    if (this.electronService.isElectronApp) {
      var p = Path.join(ENTITIES_REPO, entityName + '.xml');
      try {
        var fileContent = Fs.readFileSync(Path.join(ENTITIES_REPO, entityName + '.xml'), 'utf8'); 
      }
      catch (e) {
        console.log(e);
        this.lastError = e.message? e.message : e;
        return false;
      }
      var parser = new Xml2jsParser();
      parser.parseString(fileContent, (err, result) => {
        if (err) {
          console.log(err);
          this.messagesServices.error("Failed loading entities: " + err.message? err.message: "");
          return;
        }
        console.log(result);
        for (let col of result.Table.Fields[0].Column) {
          var column = new Column(
            col.$.Name,
            String2Type(col.$.Type),
            col.$.Length
          );
          entity.columns.push(column);
        }
      });

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

    return true;
  }

  public get(key: string): Entity {
    return this.catalog.get(key);
  }

}
