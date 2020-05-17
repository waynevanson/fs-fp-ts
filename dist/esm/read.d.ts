/// <reference types="node" />
/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
/**
 * @since 0.0.0
 */
export declare type ReadOptions = {
    offset: number;
    length: number;
    position: number | "current";
};
/**
 * @since 0.0.0
 */
export declare function read<O extends ReadOptions>(options: O): <T extends number, U extends DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array>(fd: T, buffer: U) => taskEither.TaskEither<NodeJS.ErrnoException, [T, U, number]>;
