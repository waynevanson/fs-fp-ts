/// <reference types="node" />
/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare function unlink<P extends fs.PathLike>(path: P): taskEither.TaskEither<NodeJS.ErrnoException, P>;
