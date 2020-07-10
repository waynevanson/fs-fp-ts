import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "./util";
import { TaskEitherNode } from "./util/types/fp";

export function unlink(path: fs.PathLike): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.unlink(path, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}
