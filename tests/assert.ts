import * as assert from "assert";
import { io as IO, either as E } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";

export const factory = (f: (result: unknown, expected: unknown) => void) => <A>(
  b: A
) => (a: A): IO.IO<void> => () => f(a, b);

export const strictEqual = factory(assert.strictEqual);
export const deepStrictEqual = factory(assert.deepStrictEqual);
export const notStrictEqual = factory(assert.notStrictEqual);
export const notDeepStrictEqual = factory(assert.notDeepStrictEqual);

export const fail = (description?: string) => <A>(
  value: A
): IO.IO<void> => () =>
  assert.fail(
    new Error(
      JSON.stringify({
        value,
        description,
      })
    )
  );

export const failLeft = (description?: string) => <E, A>(fa: E.Either<E, A>) =>
  pipe(fa, E.fold(fail(description), IO.of)) as IO.IO<A>;
