/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { Time } from "./util";
/**
 * @since 0.0.0
 */
export declare function utimes<A extends Time, M extends Time>(atime: A, mtime: M): <P extends fs.PathLike>(pathLike: P) => taskEither.TaskEither<NodeJS.ErrnoException, P>;
