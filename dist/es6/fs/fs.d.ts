/// <reference types="node" />
import { taskEither as TE } from "fp-ts";
import { PathLikeOrFD, WriteFileOptions } from "./types";
export declare const readFile: (flag?: "a" | "ax" | "a+" | "ax+" | "as" | "as+" | "r" | "r+" | "rs+" | "w" | "wx" | "w+" | "wx+" | undefined) => (path: PathLikeOrFD) => TE.TaskEither<NodeJS.ErrnoException, Buffer>;
export declare const writeFile: (options?: WriteFileOptions) => (path: PathLikeOrFD) => (data: NodeJS.ArrayBufferView) => TE.TaskEither<NodeJS.ErrnoException, void>;
