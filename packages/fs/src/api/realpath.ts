import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function realpath() {
  return () =>
    taskEither.tryCatch(
      () => new Promise((resolve, reject) => {}),
      enforceErrnoException
    );
}
