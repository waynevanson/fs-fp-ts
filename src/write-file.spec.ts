import {
  either as E,
  reader as R,
  readerTaskEither as RTE,
  taskEither as TE,
} from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import * as path from "path";
import * as fs from ".";
import { fixturesDir } from "../test-utils";
import { TaskEitherNode } from "./util/types/fp";
import * as fc from "fast-check";

export interface WriteFileArgs {
  dir: string;
  content: string;
}

type WriteFileFunction = ({
  dir,
  content,
}: WriteFileArgs) => TaskEitherNode<void>;

interface Cell {
  name: string;
  property: WriteFileFunction;
}

const table: Cell[] = [
  {
    name: "overload one without options",
    property: ({ dir, content }) => fs.writeFile(dir, content),
  },
  {
    name: "overload one with options",
    property: ({ dir, content }) => fs.writeFile(dir, content, {}),
  },
  {
    name: "overload two without options",
    property: ({ dir, content }) => fs.writeFile(content)(dir),
  },
  {
    name: "overload two with options",
    property: ({ dir, content }) => fs.writeFile(content)(dir),
  },
  {
    name: "overload three with options",
    property: ({ dir, content }) => fs.writeFile({})(content)(dir),
  },
  {
    name: "overload three without options",
    property: ({ dir, content }) => fs.writeFile()(content)(dir),
  },
];

const subject = (property: WriteFileFunction) =>
  pipe(
    RTE.ask<WriteFileArgs>(),
    R.map(TE.chain(property)),
    RTE.chain(() =>
      pipe(
        RTE.asks((deps: WriteFileArgs) => deps.dir),
        R.map(
          TE.chain(
            pipe(
              fs.readFile({ encoding: "utf8" }),
              RTE.chainFirst(() => fs.unlink)
            )
          )
        )
      )
    )
  );

describe.each(table)(fs.writeFile.name, ({ name, property }) => {
  test(name, async () => {
    await fc.assert(
      fc.asyncProperty(fc.hexaString(), fc.string(), async (dir, content) => {
        const result = await subject(property)({
          dir: path.resolve(fixturesDir, "write-file" + dir),
          content,
        })();
        expect(result).toStrictEqual(E.right(content));
      })
    );
  });
});
