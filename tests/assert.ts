import * as assert from "assert";
import { either as E, io as IO } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";

export const factory = (f: (result: unknown, expected: unknown) => void) => <A>(
  b: A
) => (a: A): IO.IO<void> => () => f(a, b);

export const strictEqual = factory(assert.strictEqual);
export const deepStrictEqual = factory(assert.deepStrictEqual);
export const notStrictEqual = factory(assert.notStrictEqual);
export const notDeepStrictEqual = factory(assert.notDeepStrictEqual);

export const isError = <A>(a: A): a is Extract<A, Error> => a instanceof Error;

export const fail = <E>(error: E): IO.IO<void> => () =>
  pipe(
    error,
    E.fromPredicate(isError, (e) => e as Exclude<E, Error>),
    E.swap,
    E.chain((e) => E.stringifyJSON(e, (e) => e as Error)),
    E.swap,
    E.getOrElse((e) => new Error(e)),
    assert.fail
  );

export const failLeft = <E, A>(fa: E.Either<E, A>) =>
  pipe(fa, E.fold(fail, IO.of)) as IO.IO<A>;

export const failRight = <E, A>(fa: E.Either<E, A>) =>
  pipe(fa, E.fold(IO.of, fail)) as IO.IO<E>;
