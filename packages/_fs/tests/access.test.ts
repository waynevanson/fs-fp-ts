import * as fs from "@fp-ts-node/fs";
import { array, either, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import * as path from "path";

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

describe(fs.access, () => {
  beforeAll(
    pipe(
      vvv,
      array.map(([name, mode]) => fs.writeFile({ mode })(filename(name), "")),
      array.array.sequence(taskEither.taskEither)
    )
  );

  afterAll(
    pipe(
      vvv,
      array.map(([name]) => fs.unlink(filename(name))),
      array.array.sequence(taskEither.taskEither)
    )
  );

  test("Right on visible", async () => {
    const p = path.resolve(fixturesDir, "findable-file");
    const r = await fs.access("visible")(p)();
    const e = either.right(p);
    expect(r).toStrictEqual(e);
    return;
  });

  test("Left on visible", async () => {
    const p = "";
    const r = await fs.access("visible")(p)();
    const e = either.left(p);
    expect(either.isLeft(r)).toBeTruthy();
    return;
  });

  test("Right on readable", async () => {
    const p = path.resolve(fixturesDir, "readable-file");
    const r = await fs.access("visible")(p)();
    const e = either.right(p);
    expect(r).toStrictEqual(e);
    return;
  });

  test("Left on readable", async () => {
    const p = path.resolve(fixturesDir, "findable-file");
    const r = await fs.access("readable")(p)();
    const e = either.left(p);
    expect(either.isLeft(r)).toBeTruthy();
    return;
  });

  test("Right on writable", async () => {
    const p = path.resolve(fixturesDir, "writeable-file");
    const r = await fs.access("writeable")(p)();
    const e = either.right(p);
    expect(r).toStrictEqual(e);
    return;
  });

  test("Left on writeable", async () => {
    const p = path.resolve(fixturesDir, "findable-file");
    const r = await fs.access("writeable")(p)();
    const e = either.left(p);
    expect(either.isLeft(r)).toBeTruthy();
    return;
  });

  test("Right on executable", async () => {
    const p = path.resolve(fixturesDir, "executable-file");
    const r = await fs.access("executable")(p)();
    const e = either.right(p);
    expect(r).toStrictEqual(e);
    return;
  });

  test("Left on executable", async () => {
    const p = path.resolve(fixturesDir, "findable-file");
    const r = await fs.access("executable")(p)();
    const e = either.left(p);
    expect(either.isLeft(r)).toBeTruthy();
    return;
  });
});
