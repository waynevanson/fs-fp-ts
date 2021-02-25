/// <reference types="node" />
import { taskEither as TE } from "fp-ts";
import { Flags, PathLikeOrFD, WriteableData, WriteFileOptions } from "./types";
export declare const readFile: (flag: Flags) => (path: PathLikeOrFD) => TE.TaskEither<NodeJS.ErrnoException, Buffer>;
export declare const writeFile: (options?: WriteFileOptions) => (path: PathLikeOrFD) => (data: WriteableData) => TE.TaskEither<NodeJS.ErrnoException, void>;
