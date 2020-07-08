import * as _fs from "fs";

/**
 * @summary
 * Time values that `_fs` accepts.
 */
export type Time = string | number | Date;
export type FileDescriptor = number;
export type PathLikeOrFileDescriptor = FileDescriptor | _fs.PathLike;
