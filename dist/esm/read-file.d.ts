/// <reference types="node" />
import { FileSystemFlags } from "./util";
import { TaskEither } from "fp-ts/lib/TaskEither";
/**
 * @since 0.0.0
 */
export declare function readFile<T extends "Buffer" | BufferEncoding = never>(encoding: T, flag?: FileSystemFlags): <P extends string | number | Buffer | import("url").URL = never>(path: P) => TaskEither<NodeJS.ErrnoException, T extends "Buffer" ? Buffer : string>;
