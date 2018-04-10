import { Column } from './column.model';
export class Entity {
    constructor(public name: string) {}

    tableName: string = "";
    columns: Column[] = [];

    getColumn(name: string) : Column {
        for (let column of this.columns) {
            if (column.name === name) {
                return column;
            }
        }
        return null;
    }
}
