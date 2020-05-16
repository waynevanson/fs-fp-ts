/**
 * @since 0.0.0
 */
import * as fs from "../";
import { FileDescriptor } from "../util";

/**
 * @since 0.0.0
 */
export function writeFile<O extends fs.WriteFileOptions>(options: O) {
  return <T extends FileDescriptor, U extends string>(
    fileDescriptor: T,
    data: U
  ) => fs.writeFile(options)(fileDescriptor, data);
}
