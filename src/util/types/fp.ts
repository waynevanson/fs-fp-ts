import { ReaderTaskEither } from "fp-ts/lib/ReaderTaskEither";
import { TaskEither } from "fp-ts/lib/TaskEither";

export type ReaderTaskEitherNode<R, A = void> = ReaderTaskEither<
  R,
  NodeJS.ErrnoException,
  A
>;

export type TaskEitherNode<A = void> = TaskEither<NodeJS.ErrnoException, A>;
