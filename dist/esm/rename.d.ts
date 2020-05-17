/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare function rename<N extends fs.PathLike, O extends fs.PathLike>(f: (currentPath: O) => N): (currentPath: O) => taskEither.TaskEither<NodeJS.ErrnoException, N>;
