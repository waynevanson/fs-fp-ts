/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare type RmdirOptions = {
    recursive: false;
} | {
    recursive: true;
    maxRetries?: number;
    retryDelay?: number;
};
/**
 * @since 0.0.0
 */
export declare function rmdir(options: RmdirOptions): <P extends fs.PathLike>(pathLike: P) => taskEither.TaskEither<NodeJS.ErrnoException, P>;
