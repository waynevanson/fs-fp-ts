/// <reference types="node" />
import { TaskEither } from "fp-ts/lib/TaskEither";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare function readlink<T extends "Buffer">(type: T): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, Buffer>;
/**
 * @since 0.0.0
 */
export declare function readlink<T extends BufferEncoding>(type: T): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, string>;
