import * as path from "path";
import * as fs from "./src";

export const fixturesDir = path.resolve(__dirname, "./__temp/fixtures");
export const mkdirFixtures = fs.mkdir(fixturesDir, { recursive: true });
export const rmdirFixtures = fs.rmdir(fixturesDir, { recursive: true });
