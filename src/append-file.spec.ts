import * as fc from "fast-check";
import { either as E, readerTaskEither as RTE } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import * as path from "path";
import * as fs from ".";
import {
  FileArgsDeps,
  fixturesDir,
  rReadFile,
  rUnlink,
  rWriteFile,
} from "../test-utils";
import { TaskEitherNode } from "./util/types/fp";

const subject = <T>(rAppendFile: (deps: FileArgsDeps) => TaskEitherNode<T>) =>
  pipe(
    rWriteFile,
    RTE.chainFirst(() => rAppendFile),
    RTE.chain(() => rReadFile),
    RTE.chainFirst(() => rUnlink)
  );

const table: Array<{
  name: string;
  property: (deps: FileArgsDeps) => TaskEitherNode;
}> = [
  {
    name: "overload one without options appends files correctly",
    property: ({ dir, content }) => fs.appendFile()(content)(dir),
  },
  {
    name: "overload one with options appends files correctly",
    property: ({ dir, content }) => fs.appendFile({})(content)(dir),
  },
  {
    name: "overload two without options appends files correctly",
    property: ({ dir, content }) => fs.appendFile(content)(dir),
  },
  {
    name: "overload two with options appends files correctly",
    property: ({ dir, content }) => fs.appendFile(content, {})(dir),
  },
  {
    name: "overload three without options appends files correctly",
    property: ({ dir, content }) => fs.appendFile(dir, content),
  },
  {
    name: "overload three without options appends files correctly",
    property: ({ dir, content }) => fs.appendFile(dir, content, {}),
  },
];

describe.skip.each(table)(fs.appendFile.name, ({ name, property }) => {
  test(name, async () => {
    await fc.assert(
      fc.asyncProperty(fc.hexaString(), fc.string(), async (dir, content) => {
        const newContent = content + content;
        const input = {
          dir: path.resolve(fixturesDir, "append-file-overloads" + dir),
          content,
        };
        const result = await subject(property)(input)();
        expect(result).toStrictEqual(E.right(newContent));
      })
    );
  });
});
