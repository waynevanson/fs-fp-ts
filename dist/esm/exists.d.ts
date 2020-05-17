/// <reference types="node" />
/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { task } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare function exists<P extends fs.PathLike>(pathLike: P): task.Task<boolean>;
