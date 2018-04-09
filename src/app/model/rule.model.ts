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
        if (target.type == Type.Money || target.type == Type.Double || target.type == Type.Float || target.type == Type.Quantity) {
            if (source === "") {
                return ("0.0"); // avoid leaving empty strings for numbers in XML, console import fails otherwise
            } else {
                return source.replace(',','.');    
            }
        } else if (target.type == Type.Integer || target.type == Type.Long ) {
            if (source === "") {
                return ("0"); // avoid leaving empty strings for numbers in XML, console import fails otherwise
            } else {
                return source;    
            }
        } else {
            return source;    
        }
    }
}

export class Fixed implements Rule { 
    constructor(public value: string) {}

    apply(source: string, target: Column): string {
        return this.value;
    }

}
