/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare function link<U extends fs.PathLike>(existingPath: U): <T extends fs.PathLike>(newPath: T) => taskEither.TaskEither<NodeJS.ErrnoException, unknown>;
