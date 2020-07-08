import { array, either, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import * as path from "path";
import * as fs from "../src";

export const fixturesDir = path.resolve(__dirname, "fixtures");

const filename = (name: string) => path.resolve(fixturesDir, name);

export const files = {
  executable: { name: filename("executable"), mode: 0o100 },
  visible: { name: filename("visible"), mode: 0o000 },
  readable: { name: filename("readable"), mode: 0o400 },
  writeable: { name: filename("writeable"), mode: 0o200 },
};

const vvv = [
  ["executable-file", 0o100] as const,
  ["findable-file", 0o000] as const,
  ["readable-file", 0o400] as const,
  ["writeable-file", 0o200] as const,
];

// install fast check
describe(fs.access, () => {
  describe("overloads", () => {});
});
