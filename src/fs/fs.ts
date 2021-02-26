/**
 * @summary
 * API's directly from the `fs` module in node.
 */
import { taskEither as TE } from "fp-ts";
import { constVoid, pipe } from "fp-ts/lib/function";
import * as FS from "fs";
import {
  asNodeJSError,
  extractFromTuplet,
  handleErrors,
  promise,
} from "../utilities";
import {
  Flags,
  PathLikeOrFD,
  WriteFileOptions,
  FileMode,
  PathLike,
} from "./types";

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

export const access = (mode?: FileMode) => (path: PathLike) =>
  pipe(
    TE.tryCatch(
      promise<[]>((executor) => {
        FS.access(path, mode, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(constVoid)
  );

export const link = (to: PathLike) => (from: string) =>
  pipe(
    TE.tryCatch(
      promise((executor) => {
        FS.link(from, to, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(constVoid)
  );

export const unlink = (path: PathLike) =>
  pipe(
    TE.tryCatch(
      promise<[]>((executor) => FS.unlink(path, handleErrors(executor))),
      asNodeJSError
    ),
    TE.map(constVoid)
  );

export const stat = (path: PathLike) =>
  pipe(
    TE.tryCatch(
      promise<[FS.Stats]>((executor) => {
        FS.stat(path, { bigint: false }, handleErrors(executor));
      }),
      asNodeJSError
    ),
    TE.map(extractFromTuplet)
  );
