import * as assert from "assert";
import {
  array as A,
  either as E,
  io as IO,
  stateReaderTaskEither,
  task as T,
  writer as WR,
} from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { observable as OB } from "fp-ts-rxjs";
import { Functor } from "fp-ts/lib/Functor";
import { HKT } from "fp-ts/lib/HKT";
import { Applicative } from "fp-ts/lib/Applicative";

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

// run `fa`
// description
type TestData = string;

// all tests are tasks.
// as tests complete, log it. with an observable.
// tasks = Array<Task>
// (tests: Array<Task>) => pipe(tests,A.map(test => pipe(test, )))

type Test<F, E, A> = [HKT<F, E.Either<E, A>>, string];

type FailError<A> = {
  _tag: "Threw";
  error: A;
};

type FailNotEqual<A, B> = {
  _tag: "NotEqual";
  expected: A;
  received: B;
};

export type Fail<E, A> = FailError<A> | FailNotEqual<E, A>;

// turn HKT into an observable,
const dotests = <F>(Applicative: Applicative<F>) => <E, A>(
  tests: Array<Test<F, E, A>>
) =>
  pipe(
    tests,
    A.map(([fa, description]) => pipe(OB.of(`Starting test ${description}`)))
  );
