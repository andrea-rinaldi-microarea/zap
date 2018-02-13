declare const __xml2js;

export class Xml2jsParser {
    private __parser: any;
    constructor() {
        this.__parser = new __xml2js.Parser();
    }

    parseString(data: string, callback: ( err: any, result: any ) => void) {
        this.__parser.parseString(data, callback);
    }
}
