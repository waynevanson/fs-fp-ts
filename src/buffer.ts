import { Eq } from "fp-ts/lib/Eq";
import { Monoid } from "fp-ts/lib/Monoid";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";

export const zero = () => Buffer.from([]);

export const bufferMonoid: Monoid<Buffer> = {
  concat: (x, y) => Buffer.concat([x, y]),
  empty: zero(),
};

export const bufferEquals: Eq<Buffer> = {
  equals: (x, y) => x.equals(y),
};

export const bufferCompare: Ord<Buffer> = {
  ...bufferEquals,
  compare: (x, y) => x.compare(y) as Ordering,
};

export const encode = (encoding: BufferEncoding = "utf-8") => (fa: Buffer) =>
  fa.toString(encoding);

export const decode = (encoding: BufferEncoding = "utf-8") => (fa: string) =>
  Buffer.from(fa, encoding);
