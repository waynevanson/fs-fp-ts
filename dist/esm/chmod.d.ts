/// <reference types="node" />
/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
import { Permissions } from "./util";
/**
 * @since 0.0.0
 */
export declare function chmod<N extends Permissions>(permissions: N): <T extends fs.PathLike>(pathLike: T) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
