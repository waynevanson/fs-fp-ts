/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import { FileDescriptor } from "./util";
/**
 * @since 0.0.0
 */
export declare function close<T extends FileDescriptor>(fileDescriptor: T): taskEither.TaskEither<NodeJS.ErrnoException, T>;
