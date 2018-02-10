import { Column } from './column.model';
export class InputStream {
    constructor(
        public name: string,
        public hasHeaders: boolean = false
    ) {}
    
    columns: Column[] = [];
}
