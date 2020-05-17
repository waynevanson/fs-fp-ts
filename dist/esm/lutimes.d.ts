/// <reference types="node" />
/**
 * @summary
 * Hello world
 *
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { Time } from "./util";
/**
 * @since 0.0.0
 */
export declare function lutimes<A extends Time, B extends Time>(accessTime: A, modifyTime: B): <T extends fs.PathLike>(path: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
