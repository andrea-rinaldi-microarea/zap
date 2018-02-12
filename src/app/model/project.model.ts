import { Job } from "./job.model";

export class Project {
    constructor(public name: string) {}
    pathName: string;
    sourceFolder: string;
    targetFolder: string;
    jobs: Job[] = [];
}
