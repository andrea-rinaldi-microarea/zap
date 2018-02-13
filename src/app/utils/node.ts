
declare const __node_fs;
declare const __path_fs;

export class Path {
    static basename(p: string, ext?: string): string {
        return __path_fs.basename(p, ext);
    };
}

export class Fs {
    static readdirSync(path: string | Buffer, options?: { encoding?: string | null } | string | null): string[] {
        return __node_fs.readdirSync(path, options);
    }
}
  