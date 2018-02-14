export enum Type {
    String = "String",
    Bool = "Bool",
    Long = "Long",
    Integer = "Integer",
    Money = "Money",
    Quantity = "Quantity",
    Double = "Double",
    Percent = "Percent",
    Float = "Float",
    Enum = "Enum",
    Date = "Date",
    Datetime = "Datetime"
}

export function String2Type(input: string): Type {
    switch (input) {
        case "Money": return Type.Money;
        default: return <Type>input;
    }
}
export class Column {
    constructor(
        public name?: string,
        public type?: Type,
        public length?: number
    )
    {}

    assign(column: Column) {
        this.name = column.name;
        this.type = column.type;
        this.length = column.length;
    }

    typeDescription() : string {
        switch (this.type) {
            case Type.String : return this.type.toString() + "(" + this.length + ")";
            default :  return this.type.toString();
        }
    }
}
