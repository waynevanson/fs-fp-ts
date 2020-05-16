/**
 * @since 0.0.0
 */
import { array, eq, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import * as fs from "fs";
import { enforceErrnoException, EnforceNonEmptyArray } from "../util";

/**
 * @since 0.0.0
 */
export type AccessMode = "visible" | "readable" | "writeable" | "executable";

function getAccessMode(a: AccessMode) {
  switch (a) {
    case "executable":
      return fs.constants.X_OK;
    case "readable":
      return fs.constants.R_OK;
    case "writeable":
      return fs.constants.W_OK;
    case "visible":
    default:
      return fs.constants.F_OK;
  }
}

function transformAccessModes(a: AccessMode[]) {
  return pipe(
    a,
    array.uniq(eq.eqString),
    array.map(getAccessMode),
    array.reduce(0, (prev, curr) => prev | curr)
  );
}

/**
 * @todo uniquify `modes` arguments at type level.
 *
 * @since 0.0.0
 */
export function access<U extends AccessMode[]>(
  ...modes: EnforceNonEmptyArray<U>
) {
  const newModes = transformAccessModes(modes);
  return <T extends fs.PathLike>(pathLike: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.access(pathLike, newModes, (e) => {
            !e ? resolve(pathLike) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
access("visible");
