import { either } from "fp-ts";
import * as path from "path";
import * as fs from "../src";

export const fixturesDir = path.resolve(__dirname, "fixtures");

describe(fs.appendFile, () => {
  describe("basic", () => {
    test("", async () => {
      const p = path.resolve(fixturesDir, "./append-file");
      const d = "";
      const r = await fs.appendFile({ mode: 0o666 })(p, d)();
      expect(r).toStrictEqual(either.right(p));
      return;
    });
  });
});
