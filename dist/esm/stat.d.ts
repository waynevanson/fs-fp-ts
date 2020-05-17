/// <reference types="node" />
import * as fs from "fs";
import { TaskEither } from "fp-ts/lib/TaskEither";
/**
 * @since 0.0.0
 */
export declare function stat<T extends "BigIntStats">(type: T): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, fs.BigIntStats>;
/**
 * @since 0.0.0
 */
export declare function stat<T extends "Stats">(type: T): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, fs.Stats>;
