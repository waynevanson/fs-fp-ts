/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import { Time } from "./util";
/**
 * @since 0.0.0
 */
export declare function futimes<A extends Time, B extends Time>(accessTime: A, modifyTime: B): <T extends number>(fileDescriptor: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
