import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "../util";

export const {
  S_IRUSR,
  S_IWUSR,
  S_IXUSR,
  S_IRGRP,
  S_IWGRP,
  S_IXGRP,
  S_IROTH,
  S_IWOTH,
  S_IXOTH,
} = fs.constants;

export function fchmod(permissions: number) {
  return <T extends number>(fileDescriptot: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.fchmod(fileDescriptot, permissions, (e) => {
            !e ? resolve(fileDescriptot) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
