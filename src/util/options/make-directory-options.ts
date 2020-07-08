import { FileMode } from "../types/file-permissions";

export interface MakeDirectoryOptions {
  recursive?: boolean;
  mode?: FileMode;
}
