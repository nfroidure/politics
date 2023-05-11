import { join as pathJoin } from "path";
import { promises as fs } from "fs";

export { pathJoin };

export async function readDir(dirPath: string): Promise<string[]> {
  return await fs.readdir(dirPath);
}

export async function readFile(path: string): Promise<string> {
  return (await fs.readFile(path)).toString();
}

export async function readJSON<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path)) as T;
}
