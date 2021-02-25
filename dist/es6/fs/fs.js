import { taskEither as TE } from "fp-ts";
import { constVoid, pipe } from "fp-ts/lib/function";
import * as FS from "fs";
import { asNodeJSError, extractFromTuplet, handleErrors, promise, } from "../utilities";
export const readFile = (flag) => (path) => pipe(TE.tryCatch(promise((executor) => {
    FS.readFile(path, { flag, encoding: null }, handleErrors(executor));
}), asNodeJSError), TE.map(extractFromTuplet));
export const writeFile = (options = {}) => (path) => (data) => pipe(TE.tryCatch(promise((executor) => {
    FS.writeFile(path, data, options, handleErrors(executor));
}), asNodeJSError), TE.map(constVoid));
