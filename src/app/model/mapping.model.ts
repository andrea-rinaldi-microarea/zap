import { Column } from "./column.model";

export class Mapping {
    constructor(
        public targetColumn: Column,
        public sourceColumn?: number,
        public rule?: string
    ) {}

    fixedValue?: string;
}
