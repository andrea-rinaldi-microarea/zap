import { Job } from "./job.model";

export class Project {
    constructor(public name: string) {}
    filePath: string;
    sourceFolder: string;
    targetFolder: string;
    jobs: Job[] = [];
}
