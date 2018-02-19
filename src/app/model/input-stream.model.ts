import { Column } from './column.model';

export type InputStreamData = { data: string[][]; }

export class InputStream {
    constructor(
        public name?: string,
        public hasHeaders: boolean = false
    ) {}
    
    columns: Column[] = [];

    skip: string = "";
}
