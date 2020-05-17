/// <reference types="node" />
import { TaskEither } from "fp-ts/lib/TaskEither";
/**
 * @since 0.0.0
 */
export declare function mkdtemp<O extends "buffer">(options: O): (prefix: string) => TaskEither<NodeJS.ErrnoException, Buffer>;
/**
 * @since 0.0.0
 */
export declare function mkdtemp<O extends BufferEncoding>(options: O): (prefix: string) => TaskEither<NodeJS.ErrnoException, string>;
