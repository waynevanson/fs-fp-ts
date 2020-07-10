import {
  option as O,
  taskEither as TE,
  task as T,
  readerTaskEither as RTE,
  readerTask as RT,
  either as E,
  reader as R,
} from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import * as path from "path";
import * as fs from ".";
import { fixturesDir } from "../test-utils";
import * as fc from "fast-check";
import { FileMode } from "./util/types/file-permissions";
import { AccessMode } from "./access";
import { sequenceT } from "fp-ts/lib/Apply";
import * as _fs from "fs";

interface Model {
  name: AccessMode;
  max: number;
  success: ReturnType<typeof fc.integer>;
}

const zerozero = fc.integer(0, 0);
const zeroone = fc.integer(0, 1);
const zerotwo = fc.integer(0, 2);
const zerofour = fc.integer(0, 4);
const zerosix = fc.integer(0, 6);
const zeroseven = fc.integer(0, 7);

const models: Model[] = [
  {
    name: "visible",
    max: 0,
    success: zeroseven,
  },
  {
    name: "readable",
    max: 1,
    success: zeroseven,
  },
  {
    name: "writeable",
    max: 0,
    success: zeroseven,
  },
  {
    name: "executable",
    max: 0,
    success: zeroseven,
  },
];

const through = <T>(a: T) => {
  console.log("Debug:");
  console.log(a);
  return a;
};

// install fast check
describe.each(models)(fs.access.name, ({ name, success }) => {
  it(`access with with name: \"${name}\"`, async () => {
    await fc.assert(
      fc.asyncProperty(
        success,
        zeroseven,
        zeroseven,
        fc.hexa(),
        async (a, b, c, d) => {
          const mode = Number("0o" + a + b + c) as FileMode;
          const filePath = path.resolve(fixturesDir, "./" + d);

          const fold = RTE.fold(
            () => RT.of<_fs.PathLike, boolean>(false),
            () => RT.of(true)
          );

          // overloads are cooked.
          // partial args proving painful.
          const overloads = sequenceT(RT.readerTask)(
            // first overload
            pipe(fs.access([name]), fold),
            // first overload
            pipe(fs.access(), fold),
            // second overload
            pipe((pathLike: _fs.PathLike) => fs.access(pathLike, [name]), fold)
          );

          const withCleanup = pipe(
            fs.writeFile("", { mode }),
            RTE.chain(() =>
              pipe(
                overloads,
                RT.map((a) => E.right(a))
              )
            ),
            RTE.chainFirst(() => fs.unlink)
          );

          const result = await withCleanup(filePath)();

          expect(result).toMatchObject(E.right([true, true, true]));
        }
      )
    );
  });
});
