/// <reference types="node" />
import { taskEither as TE, readerTaskEither as RTE } from "fp-ts";
export declare type EnforceNonEmptyArray<T extends Array<any>> = T extends Array<infer U> ? T & {
    0: U;
} : never;
export declare type ReaderTaskEitherNode<R, A = void> = RTE.ReaderTaskEither<R, NodeJS.ErrnoException, A>;
export declare type TaskEitherNode<A = void> = TE.TaskEither<NodeJS.ErrnoException, A>;
export declare type Nullable<T> = T | null | undefined;
