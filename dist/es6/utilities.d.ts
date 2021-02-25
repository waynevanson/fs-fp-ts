/// <reference types="node" />
import { task as T, taskEither as TE } from "fp-ts";
import { Lazy } from "fp-ts/lib/function";
export declare const asNodeJSError: (a: unknown) => NodeJS.ErrnoException;
export declare const tryCatchNodeJSError: <A>(f: Lazy<Promise<A>>) => TE.TaskEither<NodeJS.ErrnoException, A>;
export declare type Constructor<R extends readonly unknown[], A> = {
    new (...r: R): A;
};
export declare const declass: <R extends readonly unknown[], A>(constructor: Constructor<R, A>) => (...r: R) => A;
export declare type Executor<A extends readonly unknown[]> = [
    res: (a: A) => void,
    rej: (e: unknown) => void
];
export declare const handleErrors: <A extends unknown[]>([res, rej]: Executor<A>) => <E>(error: E, ...ax: A) => void;
export declare const promise: <A extends readonly unknown[]>(f: (executor: Executor<A>) => void) => T.Task<A>;
export declare const extractFromTuplet: <A>(fa: [A]) => A;
