import { Column } from "./column.model";
import { Rule } from "./rule.model";

export class Mapping {
    constructor(
        public targetColumn: Column,
        public sourceColumn: number,
        public rule: Rule
    ) {}
}
