import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function truncate<N extends number>(length: N) {
  return <P extends fs.PathLike>(pathLike: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<P>((resolve, reject) => {
          fs.truncate(pathLike, length, (e) =>
            !e ? resolve(pathLike) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
