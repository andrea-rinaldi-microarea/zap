export class EnumItem {
    constructor(
        public name: string,
        public value: number,
        public stored: number
    ) {}
}

export class Enum {
    constructor(
        public tag: string,
        public value: number,
        public defaultValue: number
    ) {}
    items: EnumItem[] = [];
}
