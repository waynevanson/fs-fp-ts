/// <reference types="node" />
import { Eq } from "fp-ts/lib/Eq";
import { Monoid } from "fp-ts/lib/Monoid";
import { Ord } from "fp-ts/lib/Ord";
export declare const zero: () => Buffer;
export declare const bufferMonoid: Monoid<Buffer>;
export declare const bufferEquals: Eq<Buffer>;
export declare const bufferCompare: Ord<Buffer>;
export declare const encode: (encoding?: BufferEncoding) => (fa: Buffer) => string;
