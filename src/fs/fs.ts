import { taskEither as TE } from "fp-ts";
import { constVoid, pipe } from "fp-ts/lib/function";
import * as FS from "fs";
import { Flags, PathLikeOrFD, WriteableData, WriteFileOptions } from "./types";
import {
  asNodeJSError,
  extractFromTuplet,
  handleErrors,
  promise,
} from "../utilities";

export const readFile = (flag: Flags) => (path: PathLikeOrFD) =>
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
) => (data: WriteableData) =>
  pipe(
    TE.tryCatch(
      promise<[]>((executor) => {
        FS.writeFile(path, data, options, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(constVoid)
  );
