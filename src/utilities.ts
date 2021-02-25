import { either as E, task as T, taskEither as TE } from "fp-ts";
import { Lazy, pipe } from "fp-ts/lib/function";

export const asNodeJSError = (a: unknown) => a as NodeJS.ErrnoException;

export const tryCatchNodeJSError = <A>(f: Lazy<Promise<A>>) =>
  TE.tryCatch(f, asNodeJSError);

export type Constructor<R extends readonly unknown[], A> = {
  new (...r: R): A;
};

export const declass = <R extends readonly unknown[], A>(
  constructor: Constructor<R, A>
) => (...r: R) => new constructor(...r);

export type Executor<A extends readonly unknown[]> = [
  res: (a: A) => void,
  rej: (e: unknown) => void
];

export const handleErrors = <A extends unknown[]>([res, rej]: Executor<A>) => <
  E
>(
  error: E,
  ...ax: A
) => pipe(error, E.fromNullable(ax), E.swap, E.fold(rej, res));

export const promise = <A extends readonly unknown[]>(
  f: (executor: Executor<A>) => void
): T.Task<A> => () => new Promise((res, rej) => f([res, rej]));

export const extractFromTuplet = <A>(fa: [A]) => fa[0];
