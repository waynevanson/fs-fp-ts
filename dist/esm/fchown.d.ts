/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare function fchown<U extends number, G extends number>(uid: U, gid: G): <T extends number>(fileDescriptor: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
