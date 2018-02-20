import { Column } from './column.model';

export type InputStreamData = { data: string[][]; }
export const WhereConditions = [ 
    "empty",
    "not-empty"
]; 


export class InputStream {
    constructor(
        public name?: string,
        public hasHeaders: boolean = false
    ) {}
    
    columns: Column[] = [];

    whereColumn: number = -1;
    whereCondition: string = "";
}
