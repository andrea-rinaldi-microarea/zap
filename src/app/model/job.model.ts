import { Mapping } from "./mapping.model";

export class Job {
    targetEntityName: string;
    mappings: Mapping[] = [];
}
