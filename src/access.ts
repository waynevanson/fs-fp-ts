import { array as A, eq as EQ, taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import * as _fs from "fs";
import { enforceErrnoException, EnforceNonEmptyArray } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

/**
 * @summary
 * These are the four access modes that can be checked with `fs.access`
 */
export type AccessMode = "visible" | "readable" | "writeable" | "executable";

/**
 * Convert the `AccessMode` string type to it's associated constant.
 */
export function getAccessMode(mode: AccessMode) {
  switch (mode) {
    case "executable":
      return _fs.constants.X_OK;
    case "readable":
      return _fs.constants.R_OK;
    case "writeable":
      return _fs.constants.W_OK;
    case "visible":
    default:
      return _fs.constants.F_OK;
  }
}

/**
 * Uniquify and reduce the access modes into a number that fs can handle.
 */
export function transformAccessModes(modes: AccessMode[]) {
  return pipe(
    modes,
    A.uniq(EQ.contramap((a: AccessMode): string => a)(EQ.eqString)),
    A.map(getAccessMode),
    A.reduce(0, (prev, curr) => prev | curr)
  );
}

export function _access<U extends AccessMode>(
  pathLike: _fs.PathLike,
  modes: EnforceNonEmptyArray<U[]>
) {
  const newModes = transformAccessModes(modes);
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.access(pathLike, newModes, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function access<U extends AccessMode>(
  modes?: EnforceNonEmptyArray<U[]>
): ReaderTaskEitherNode<_fs.PathLike>;

export function access<U extends AccessMode>(
  pathLike: _fs.PathLike,
  modes?: EnforceNonEmptyArray<U[]>
): TaskEitherNode;

/**
 *
 * @summary
 * Use to check the access level of a file,
 * returning `Right` if it's true and `Left` otherwise.
 *
 * @param pathLike - Valid types for path values in "fs".
 * @param modes - a tuple of modes that the file should be when accessing.
 *
 * @todo uniquify `modes` arguments at type level, like in `LensFromPath` for `monocle-ts`
 */
export function access<U extends AccessMode>(
  a?: EnforceNonEmptyArray<U[]> | _fs.PathLike,
  b?: EnforceNonEmptyArray<U[]>
) {
  // first overload
  if (a === undefined) {
    return (pathLike: _fs.PathLike) => _access(pathLike, ["visible"]);
  }

  // first overload
  if (b === undefined) {
    const options = a as EnforceNonEmptyArray<U[]>;
    return (pathLike: _fs.PathLike) => _access(pathLike, options);
  }

  // second overload
  const pathLike = a as _fs.PathLike;
  return _access(pathLike, b);
}
