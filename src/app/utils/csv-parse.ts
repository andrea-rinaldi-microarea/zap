import __csvParse from 'csv-parse';
import __csvParseSync from 'csv-parse/lib/sync';

export class CsvParse {
    static parse(data: string, options : any, callback: ( err: any, output: any ) => void) {
        __csvParse(data, options, callback);
    }
    static parseSync(data: string, options : any): any {
        return __csvParseSync(data, options);
    }
}
