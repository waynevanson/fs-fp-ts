import { Flags } from "./file-attributes";
import { FileMode } from "./file-permissions";

/**
 * @summary
 * Internally, these options are the stricter counterparts for `_fs.WriteFileOptions`,
 */
export type WriteFileOptions = {
  encoding?: BufferEncoding;
  flags?: Flags;
  mode?: FileMode;
};

export interface MakeDirectoryOptions {
  recursive?: boolean;
  mode?: FileMode;
}

export type Nullable<T> = T | null | undefined;

export type BufferEncodingNullable = Nullable<BufferEncoding>;

// return a string
export type BufferOrStringOptions<E extends BufferEncoding = never> = {
  encoding?: E;
  flag?: Flags;
};
