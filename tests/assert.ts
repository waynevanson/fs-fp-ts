import * as assert from "assert";
import { io as IO } from "fp-ts";

export const factory = (f: (result: unknown, expected: unknown) => void) => <A>(
  b: A
) => (a: A): IO.IO<void> => () => f(a, b);

export const strictEqual = factory(assert.strictEqual);
export const deepStrictEqual = factory(assert.deepStrictEqual);
export const notStrictEqual = factory(assert.notStrictEqual);
export const notDeepStrictEqual = factory(assert.notDeepStrictEqual);
