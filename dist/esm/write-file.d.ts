/// <reference types="node" />
import { taskEither } from "fp-ts";
import { FileSystemFlags, Permissions } from "./util";
/**
 * @since 0.0.0
 */
export declare type WriteFileOptions = {
    flags?: FileSystemFlags;
    mode?: Permissions;
};
/**
 * @since 0.0.0
 */
export declare function writeFile<O extends WriteFileOptions>(options: O): <T extends string | number | Buffer | import("url").URL, U extends string | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array>(path: T, data: U) => taskEither.TaskEither<NodeJS.ErrnoException, T>;
