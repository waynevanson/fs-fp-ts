/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare function lstat<T extends fs.PathLike>(path: T): taskEither.TaskEither<NodeJS.ErrnoException, fs.Stats>;
