/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import { FileSystemFlags, Permissions } from "./util";
/**
 * @since 0.0.0
 */
export declare type AppendFileOptions = {
    encoding?: BufferEncoding;
    flags?: FileSystemFlags;
    mode?: Permissions;
};
/**
 * @summary
 *
 * @since 0.0.0
 */
export declare function appendFile<O extends AppendFileOptions>(options: O): <T extends string | number | Buffer | import("url").URL = never, U extends string | Uint8Array = never>(pathLikeOrFileDescriptor: T, data: U) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
