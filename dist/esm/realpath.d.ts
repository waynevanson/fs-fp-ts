/// <reference types="node" />
import * as fs from "fs";
import { TaskEither } from "fp-ts/lib/TaskEither";
/**
 * @since 0.0.0
 */
export declare function realpath<T extends "Buffer">(type: T): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, Buffer>;
/**
 * @since 0.0.0
 */
export declare function realpath<T extends BufferEncoding>(type: T): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, string>;
