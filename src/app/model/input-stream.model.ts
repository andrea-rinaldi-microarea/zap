import { Column } from './column.model';

export type InputStreamData = { data: string[][]; }
export const WhereConditions = [ 
    "empty",
    "not-empty"
]; 
export const Encodings = [
    { name: "ASCII", code: "ascii" },
    { name: "latin", code: "latin1" },
    { name: "UTF-8", code: "utf8" },
    { name: "Korean (EUC-KR)", code: "EUC-KR" },
    { name: "Korean (Windows949)", code: "Windows949" },
    { name: "Korean (KS_C_5601)", code: "KS_C_5601" },
    { name: "Windows 1250", code: "1250" },
    { name: "Windows 1252", code: "1252" },
    { name: "Windows 1258", code: "1258" }
];


export class InputStream {
    constructor(
        public name?: string,
        public hasHeaders: boolean = false
    ) {}
    
    encoding: string = "latin1";
    delimiter: string = ";";

    columns: Column[] = [];

    whereColumn: number = -1;
    whereCondition: string = "";
}
