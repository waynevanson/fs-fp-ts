import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function a() {
  return () =>
    taskEither.tryCatch(
      () => new Promise((resolve, reject) => {}),
      enforceErrnoException
    );
}
