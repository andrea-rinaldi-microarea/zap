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
    Datetime = "Datetime",
    Uuid = "uuid"
}

export function String2Type(input: string): Type {
    switch (input) {
        default: return <Type>input;
    }
}

export function fromColumn(source: Column): Column {
    return new Column(source.name, source.type, source.length);
}

export function columnTypeDescription(column: Column) : string {
    switch (column.type) {
        case Type.String : return column.type.toString() + "(" + column.length + ")";
        default :  return column.type.toString();
    }
}

export class Column {
    constructor(
        public name?: string,
        public type?: Type,
        public length?: number
    )
    {}
}
