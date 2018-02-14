declare const __csvParse;
declare const __csvParseSync;

export class CsvParse {
    static parse(data: string, options : any, callback: ( err: any, output: any ) => void) {
        __csvParse(data, options, callback);
    }
    static parseSync(data: string, options : any): any {
        return __csvParseSync(data, options);
    }
}
