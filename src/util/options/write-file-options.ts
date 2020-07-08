import { FileAttributes } from "../types/file-attributes";
import { FileMode } from "../types/file-permissions";

/**
 * @summary
 * Internally, these options are the stricter counterparts for `_fs.WriteFileOptions`,
 */
export type WriteFileOptions = {
  encoding?: BufferEncoding;
  flags?: FileAttributes;
  mode?: FileMode;
};
