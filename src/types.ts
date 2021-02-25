import { taskEither as TE, readerTaskEither as RTE } from "fp-ts";

export type EnforceNonEmptyArray<T extends Array<any>> = T extends Array<
  infer U
>
  ? T & { 0: U }
  : never;

export type ReaderTaskEitherNode<R, A = void> = RTE.ReaderTaskEither<
  R,
  NodeJS.ErrnoException,
  A
>;

export type TaskEitherNode<A = void> = TE.TaskEither<NodeJS.ErrnoException, A>;

export type Nullable<T> = T | null | undefined;
