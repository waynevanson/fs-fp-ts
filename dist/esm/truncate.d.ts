/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
/**
 * @since 0.0.0
 */
export declare function truncate<N extends number>(length: N): <P extends fs.PathLike>(pathLike: P) => taskEither.TaskEither<NodeJS.ErrnoException, P>;
