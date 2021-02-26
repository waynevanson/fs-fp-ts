/**
 * @summary
 * API's directly from the `fs` module in node.
 */
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
export const access = (mode) => (path) => pipe(TE.tryCatch(promise((executor) => {
    FS.access(path, mode, handleErrors(executor));
}), asNodeJSError), TE.map(constVoid));
export const link = (to) => (from) => pipe(TE.tryCatch(promise((executor) => {
    FS.link(from, to, handleErrors(executor));
}), asNodeJSError), TE.map(constVoid));
export const unlink = (path) => pipe(TE.tryCatch(promise((executor) => FS.unlink(path, handleErrors(executor))), asNodeJSError), TE.map(constVoid));
export const stat = (path) => pipe(TE.tryCatch(promise((executor) => {
    FS.stat(path, { bigint: false }, handleErrors(executor));
}), asNodeJSError), TE.map(extractFromTuplet));
export const statBigInt = (path) => pipe(TE.tryCatch(promise((executor) => {
    FS.stat(path, { bigint: true }, handleErrors(executor));
}), asNodeJSError), TE.map(extractFromTuplet));
