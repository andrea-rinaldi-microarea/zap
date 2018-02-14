import { Mapping } from "./mapping.model";
import { Column, Type } from "./column.model";

export interface Rule {
    apply(source: string, target: Column): string;
}

export const AllRules: string[] = [
    "Copy",
    "Fixed"
];

export class Copy implements Rule {
    apply(source: string, target: Column): string {
        // if (target.type in [ Type.Money, Type.Double, Type.Float, Type.Percent, Type.Quantity ])
        if (target.type == Type.Money)
            return source.replace(',','.');
        else
            return source;
    }
}

export class Fixed implements Rule { 
    constructor(public value: string) {}

    apply(source: string, target: Column): string {
        return this.value;
    }

}
