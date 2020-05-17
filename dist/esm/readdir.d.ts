/// <reference types="node" />
import * as fs from "fs";
import { TaskEither } from "fp-ts/lib/TaskEither";
/**
 * @since 0.0.0
 */
export declare function readdir<T extends "Buffer">(type: T): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, Buffer[]>;
export declare function readdir<T extends "Dirent">(type: T): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, fs.Dirent[]>;
export declare function readdir<T extends BufferEncoding>(type: T): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, string[]>;
