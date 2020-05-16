/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

/**
 * @since 0.0.0
 */
export type RmdirOptions =
  | { recursive: false }
  | { recursive: true; maxRetries?: number; retryDelay?: number };

/**
 * @since 0.0.0
 */
export function rmdir(options: RmdirOptions) {
  return <P extends fs.PathLike>(pathLike: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<P>((resolve, reject) => {
          fs.rmdir(pathLike, options, (e) =>
            !e ? resolve(pathLike) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
