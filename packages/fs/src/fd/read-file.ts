/**
 * @since 0.0.0
 */
import * as fs from "../fs";
import * as util from "../util";

/**
 * @since 0.0.0
 */
export function readFile<E extends "Buffer" | BufferEncoding>(
  encoding: E,
  flag?: util.FileSystemFlags
) {
  return <T extends util.FileDescriptor>(path: T) =>
    fs.readFile(encoding, flag)(path);
}
