import { Column, Type } from './../model/column.model';
import { InputStream, InputStreamData } from './../model/input-stream.model';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Fs, Path } from '../utils/node';
import { CsvParse } from '../utils/csv-parse';

@Injectable()
export class InputStreamService {

  public inputs: string[] = [];
  private sourceFolder: string;

  constructor(private electronService: ElectronService) { }

  loadInputList(folder: string) {
    this.inputs = [];
    this.sourceFolder = folder;
    if (this.electronService.isElectronApp) {
      try {
        var files = Fs.readdirSync(folder);
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
        return;
      }

      for (let file of files) {
        this.inputs.push(file);
      }
    } else {
      this.inputs =[
        "Artikel.csv",
        "Abverkauf.csv",
        "Lieferanten.csv"
      ];
    }
  }

  load(stream: InputStream, input: InputStreamData, maxLines?: number) {
    input.data = [];

    if (this.electronService.isElectronApp) {
      try {
        var fileContent = Fs.readFileSync(Path.join(this.sourceFolder, stream.name), 'latin1'); 
      }
      catch (/** @type {?} */ e) {
        console.log(e); //@@TODO error handling
        return;
      }
      let options = { delimiter: ';' };
      if (maxLines)
        options["to"] = maxLines;
        input.data = CsvParse.parseSync(fileContent, {delimiter: ';', to: maxLines});
    } else {
      for (let idx = 0; idx <= sampleChunk.length; idx++) {
        if (idx >= maxLines)
          break;
          input.data.push(sampleChunk[idx]);
      }
    }

    stream.columns = [];
    if (stream.hasHeaders) {
      for (let colname of input.data[0]) {
        stream.columns.push(new Column(colname, Type.String));
      }
      input.data.splice(0,1);
    } else {
      for (let idx in input.data[0]) {
        stream.columns.push(new Column("[Column " + idx + "]", Type.String));
      }
    }
  }
}

export var sampleChunk = [
  ["ID1","ID2","ID3","ID4","ID5","Name1","Name2","Name3","Stock","EK-Preis","VK-Preis","Lieferanten ID","Bezeichung Einheit","Bezeichnung Bestelleinheit","Faktor Einheit/Bestelleinheit","Offene Kundenauftragsmenge (in Einheit)"],
["5346","","","","","Erbsensuppe","Dose 450g","","0","2,56","5,98","3432","St�ck","VPE","10","80"],
["4144","","","","","Bohnensuppe","Dose 450g","","720","2,55","7,88","3432","St�ck","VPE","12","0"],
["76635","","","","","Graupensuppe","Dose 450g","","983","3,28","6,55","3432","St�ck","VPE","15","0"],
["22345","","","","","Linsensuppe","Dose 450g","","0","0,98","3,25","3432","St�ck","VPE","15","0"],
["99.87875-01","","","","","Gem�sesuppe","Dose 450g","vegetarisch","245","0,95","0,99","3432","St�ck","VPE","10","70"],
["335klm33","","","","","Tomatensuppe","Dose 450g","vegan","17","1,28","2,25","3432","St�ck","VPE","8","0"],
["345129","","","","","Schrauben 3,5 x 30","","","37","7","10","4578","St�ck","Karton","10","0"],
["423345","","","","","Schrauben 2,5 x 40","","","56","8","11","4578","St�ck","Karton","25","0"],
["467","","","","","Schrauben 1,5 x 30","","","20","5","17","4578","St�ck","Karton","30","10"],
["32874","","","","","Edelstahl V2A","Blech","10 x 10","14","3","22","4578","St�ck","Karton","25","10"],
["28974","","","","","Edelstahl V2A","Blech","20 x 20","7885","5","48","4578","St�ck","Karton","25","15"],
["341847","","","","","Terassenfliese","120 x 30","terracotta","354","1,68","3,59","4578","m�","Rolle","200","8"],
["1784","","","","","Terassenfliese","30 x 30","minderwertig","2012","0,0039","0,0077","4578","m�","Rolle","500","3"],
["17348247","","","","","Teppich","hochflor","beige","3","25,75","32,99","4578","Rolle","Rolle","1","0"],
["19414","","","","","Teppich ","Verlegeware","grau","157","0,25","0,99","4578","Rolle","Rolle","1","0"],
["9183","","","","","Oliven, gr�n","200g Glas","","56","12,58","16,78","4659","Tray","Palette","768","50"],
["293823","","","","","Oliven, schwarz","200g Glas","","14","15,98","99,68","4659","Tray","Palette","768","0"],
["198984","","","","","Oliven vergammelt","","","0","27,23","1,22","4659","Tray","Palette","768","0"],
["a88329","","","","","M�sliriegel","70g","","0","1,23","2,77","25368","St�ck","Karton","10","0"],
["218398","","","","","Hammer 200g","","","986","1,98","3,88","25368","St�ck","Karton","10","0"],
["a8839","","","","","Hammer 400g","","","234","7,99","12,29","25368","St�ck","Karton","10","0"],
["92484","","","","","Vorschlaghammer","","","-10","2,13","27,26","25368","St�ck","Karton","20","0"],
["42982r4","","","","","Schaufel","","","78","1,88","3,69","25368","St�ck","Karton","20","0"],
["189","","","","","Catarpillar 44 - Minibagger","","","90","17584","28574","25368","St�ck","Karton","20","0"]
];