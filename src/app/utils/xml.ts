import __xml from 'xml';

export class Xml {
    static unparse(data: object, options: any): string {
        return __xml(data, options)
    }
}
