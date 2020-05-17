/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { FileSystemFlags } from "./util";
/**
 * @since 0.0.0
 */
export declare function open<F extends FileSystemFlags, M extends number>(flags: F, mode: M): <P extends fs.PathLike>(path: P) => taskEither.TaskEither<NodeJS.ErrnoException, number>;
