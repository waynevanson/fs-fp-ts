/**
 * @since 0.0.0
 */
import * as fs from "../fs";
import * as util from "../util";

/**
 * @since 0.0.0
 */
export type AppendFileOptions = fs.AppendFileOptions;

/**
 * @summary
 * hello world
 *
 * @since 0.0.0
 */
export function appendFile<O extends fs.AppendFileOptions>(options: O) {
  return <T extends util.FileDescriptor, U extends string | Uint8Array>(
    fileDescriptor: T,
    data: U
  ) => fs.appendFile(options)(fileDescriptor, data);
}
