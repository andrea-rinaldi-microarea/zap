import { Mapping } from "./mapping.model";
import { InputStream } from "./input-stream.model";

export class Job {
    targetEntityName: string;
    mappings: Mapping[] = [];
    stream: InputStream = new InputStream();
}
