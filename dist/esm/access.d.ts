/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { EnforceNonEmptyArray } from "./util";
/**
 * @since 0.0.0
 */
export declare type AccessMode = "visible" | "readable" | "writeable" | "executable";
/**
 * @todo uniquify `modes` arguments at type level
 *
 *  @since 0.0.0
 */
export declare function access<U extends AccessMode[]>(...modes: EnforceNonEmptyArray<U>): <T extends fs.PathLike>(pathLike: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
