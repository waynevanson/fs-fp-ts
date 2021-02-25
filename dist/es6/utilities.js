import { either as E, taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
export const asNodeJSError = (a) => a;
export const tryCatchNodeJSError = (f) => TE.tryCatch(f, asNodeJSError);
export const declass = (constructor) => (...r) => new constructor(...r);
export const handleErrors = ([res, rej]) => (error, ...ax) => pipe(error, E.fromNullable(ax), E.swap, E.fold(rej, res));
export const promise = (f) => () => new Promise((res, rej) => f([res, rej]));
export const extractFromTuplet = (fa) => fa[0];
