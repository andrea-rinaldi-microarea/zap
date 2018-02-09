export enum Type {
    String,
    Bool,
    Long,
    Integer,
    Money,
    Quantity,
    Double,
    Percent,
    Float,
    Enum,
    Date,
    Datetime
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
}
