/// <reference types="node" />
import { taskEither } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare function fchmod(permissions: number): <T extends number>(fileDescriptot: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
