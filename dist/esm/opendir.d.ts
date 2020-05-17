/// <reference types="node" />
/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare function opendir<O extends fs.OpenDirOptions>(options: O): (path: string) => taskEither.TaskEither<NodeJS.ErrnoException, unknown>;
