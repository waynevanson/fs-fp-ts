/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
/**
 * @todo research fs.symlink
 * @since 0.0.0
 */
export declare function symlink(): () => taskEither.TaskEither<NodeJS.ErrnoException, unknown>;
