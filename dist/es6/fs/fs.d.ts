/// <reference types="node" />
import { taskEither as TE } from "fp-ts";
import { Flags, PathLikeOrFD, WriteFileOptions } from "./types";
export declare const readFile: (flag: Flags) => (path: PathLikeOrFD) => TE.TaskEither<NodeJS.ErrnoException, Buffer>;
export declare const writeFile: (options?: WriteFileOptions) => (path: PathLikeOrFD) => (data: NodeJS.ArrayBufferView) => TE.TaskEither<NodeJS.ErrnoException, void>;
