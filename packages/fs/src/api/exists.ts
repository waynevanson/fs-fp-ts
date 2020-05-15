import * as fs from "fs";
import * as access from "./access";

export function exists<P extends fs.PathLike>(path: P) {
  return access.access("visible")(path);
}
