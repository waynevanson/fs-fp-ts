import { taskEither as TE } from "fp-ts";
import { constVoid, pipe } from "fp-ts/lib/function";
import * as FS from "fs";
import {
  asNodeJSError,
  extractFromTuplet,
  handleErrors,
  promise,
} from "../utilities";
import { Flags, PathLikeOrFD, WriteFileOptions } from "./types";

export const readFile = (flag?: Flags) => (path: PathLikeOrFD) =>
  pipe(
    TE.tryCatch(
      promise<[Buffer]>((executor) => {
        FS.readFile(path, { flag, encoding: null }, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(extractFromTuplet)
  );

export const writeFile = (options: WriteFileOptions = {}) => (
  path: PathLikeOrFD
) => (data: NodeJS.ArrayBufferView) =>
  pipe(
    TE.tryCatch(
      promise<[]>((executor) => {
        FS.writeFile(path, data, options, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(constVoid)
  );
