import { EnumItem } from './../model/enum.model';
import { Injectable } from '@angular/core';
import { Enum } from '../model/enum.model';
import { ElectronService } from 'ngx-electron';
import { Fs, Path } from '../utils/node';
import { Xml2jsParser } from '../utils/xml2js';

const ENUMS_REPO = './dist/assets/enums';
@Injectable()
export class EnumsService {

  public enums: Enum[] = [];
  
  private catalog: Map<string, Enum> = new Map<string, Enum>();

  constructor(private electronService: ElectronService) { 
    if (this.electronService.isElectronApp) {
      try {
        var files = Fs.readdirSync(ENUMS_REPO);
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
        return;
      }

      for (let file of files) {
        try {
          var fileContent = Fs.readFileSync(Path.join(ENUMS_REPO, file), 'utf8'); 
          this.loadEnum(Path.basename(file, '.xml'), fileContent);
        }
        catch (/** @type {?} */ e) {
          console.log(e); //@@TODO error handling
          return;
        }
  
      }
    } else {
      //this.loadEnum(sampleCustSupp);
    }
    
  }

  private loadEnum(module: string, xmlContent: string) {
    var parser = new Xml2jsParser();
    parser.parseString(xmlContent, (err, result) => {
      console.log(result);
      for (let tag of result.Enums.Tag) {
        var _enum = new Enum(
          tag.$.name,
          tag.$.value,
          tag.$.defaultValue? tag.$.defaultValue : 0 
        );
        for (let item of tag.Item) {
          var _item = new EnumItem(
            item.$.name,
            item.$.value,
            item.$.stored
          );
          _enum.items.push(_item);
        }
        this.enums.push(_enum);
        this.catalog.set(module + '/' + _enum.value, _enum);
      }
    });
  }

}

const sampleCustSupp = `
  <?xml version="1.0" standalone="yes"?>
  <Enums>
    <Tag name="References" value="8" defaultValue="1">
      Indicates the type of references.
        <Item name="Separately" value="0" stored="524288" />
        <Item name="Before Each Items List" value="1" stored="524289" />
        <Item name="Document Top" value="2" stored="524290" />
        <Item name="Document Bottom" value="3" stored="524291" />
        <Item name="Standard" value="5" stored="524293" />
      </Tag>
      <Tag name="CustSupp Type" value="49">
      Indicates the type between customers and suppliers.
        <Item name="Customer" value="0" stored="3211264" />
        <Item name="Supplier" value="1" stored="3211265" />
      </Tag>
  </Enums>`;