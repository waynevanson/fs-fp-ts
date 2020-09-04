import * as fc from "fast-check";
import {
  either as E,
  reader as R,
  readerTaskEither as RTE,
  taskEither as TE,
} from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import * as path from "path";
import * as fs from ".";
import { fixturesDir, FileArgsDeps, rWriteFile, rUnlink } from "../test-utils";
import { TaskEitherNode } from "./util/types/fp";

const tableBuffer: Array<{
  name: string;
  property: (deps: FileArgsDeps) => TaskEitherNode<Buffer>;
}> = [
  {
    name: "overload one without options returns a buffer",
    property: ({ dir }) => fs.readFile(dir),
  },
  {
    name: "overload one with options returns a buffer",
    property: ({ dir }) => fs.readFile(dir, {}),
  },

  {
    name: "overload two without options returns a buffer",
    property: ({ dir }) => fs.readFile()(dir),
  },
  {
    name: "overload two with options returns a buffer",
    property: ({ dir }) => fs.readFile({})(dir),
  },
];

/**
 * @summary
 * This is basically the buildup and teardown,
 * and rReadFile is injectable!
 */
const subject = <T>(rReadFile: (deps: FileArgsDeps) => TaskEitherNode<T>) =>
  pipe(
    rWriteFile,
    RTE.chain(() => rReadFile),
    RTE.chainFirst(() => rUnlink)
  );

// these look extremely bulky.
// any ideas on how to make it nicer?
// or is this what property testing looks like?

describe.skip.each(tableBuffer)(fs.readFile.name, ({ name, property }) => {
  test(name, async () => {
    await fc.assert(
      fc.asyncProperty(fc.hexaString(), fc.string(), async (dir, content) => {
        const input = {
          dir: path.resolve(fixturesDir, "write-file-buffer" + dir),
          content,
        };

        const result = await pipe(
          subject(property),
          RTE.map((buffer) => buffer.toString())
        )(input)();

        expect(result).toStrictEqual(E.right(content));
      })
    );
  });
});

const tableString: Array<{
  name: string;
  property: (deps: FileArgsDeps) => TaskEitherNode<string>;
}> = [
  {
    name: "overload two with options returns a string",
    property: ({ dir }) => fs.readFile({ encoding: "utf-8" })(dir),
  },
  {
    name: "overload one with options returns a string",
    property: ({ dir }) => fs.readFile(dir, { encoding: "utf-8" }),
  },
];

describe.skip.each(tableString)(fs.readFile.name, ({ name, property }) => {
  test(name, async () => {
    await fc.assert(
      fc.asyncProperty(fc.hexaString(), fc.string(), async (dir, content) => {
        const input = {
          dir: path.resolve(fixturesDir, "write-file-string" + dir),
          content,
        };
        const result = await subject(property)(input)();
        expect(result).toStrictEqual(E.right(content));
      })
    );
  });
});
