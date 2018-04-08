
declare const __node_fs;
declare const __node_path;
import * as __iconv from 'iconv-lite';

export class Path {
    static basename(p: string, ext?: string): string {
        return __node_path.basename(p, ext);
    };
    static join(p1:string, p2:string, p3?:string, p4?:string): string {
        return __node_path.join(p1,p2,p3?p3:"",p4?p4:"");
    }
}

export class Fs {
    static readdirSync(path: string | Buffer, options?: { encoding?: string | null } | string | null): string[] {
        return __node_fs.readdirSync(path, options);
    }
    static readFileSync(filename: string, encoding: string): string {
        return __iconv.decode(__node_fs.readFileSync(filename), encoding);
    }
    static writeFileSync(filename: string, data: string, options?: any) {
        __node_fs.writeFileSync(filename, data, options);
    }
    static existsSync(path: string): boolean {
        return __node_fs.existsSync(path);
    }
}
  