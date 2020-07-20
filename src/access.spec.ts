/**
 * @todo
 * Test if the mode arguments all work.
 * Chances are we'll have to implement our own `Arbitrary` for chmod.
 */
import * as fc from "fast-check";
import { rWriteFile, FileArgsDeps, rUnlink, fixturesDir } from "../test-utils";
import { pipe } from "fp-ts/lib/function";
import {
  readerTaskEither as RTE,
  reader as R,
  taskEither as TE,
  task as T,
  either as E,
} from "fp-ts";
import { TaskEitherNode } from "./util/types/fp";
import * as fs from ".";
import * as path from "path";

const tableOverloads: Array<{
  name: string;
  property: (deps: FileArgsDeps) => TaskEitherNode;
}> = [
  {
    name: "First overload without options returns true",
    property: pipe(
      R.asks((deps: FileArgsDeps) => deps.dir),
      R.map(fs.access())
    ),
  },
  {
    name: "First overload with options returns true",
    property: pipe(
      R.asks((deps: FileArgsDeps) => deps.dir),
      R.map(fs.access({}))
    ),
  },
  {
    name: "Second overload without options returns",
    property: pipe(
      R.asks((deps: FileArgsDeps) => deps.dir),
      R.map((dir) => fs.access(dir))
    ),
  },
  {
    name: "Second overload with options returns",
    property: pipe(
      R.asks((deps: FileArgsDeps) => deps.dir),
      R.map((dir) => fs.access(dir, {}))
    ),
  },
];

const subject = (rAccess: (deps: FileArgsDeps) => TaskEitherNode) =>
  pipe(
    rWriteFile,
    RTE.chain(() =>
      pipe(
        rAccess,
        R.map(
          TE.fold(
            () => T.of(false),
            () => T.of(true)
          )
        ),
        R.map((a) => TE.fromTask(a))
      )
    ),
    RTE.chainFirst(() => rUnlink)
  );

describe.each(tableOverloads)(fs.access.name, ({ name, property }) => {
  test(name, async () => {
    await fc.assert(
      fc.asyncProperty(fc.hexaString(), fc.string(), async (dir, content) => {
        const result = await subject(property)({
          dir: path.resolve(fixturesDir, "access-file" + dir),
          content,
        })();
        expect(result).toStrictEqual(E.right(true));
      })
    );
  });
});
