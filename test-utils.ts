import * as path from "path";
import { readerTaskEither as RTE, reader as R, taskEither as TE } from "fp-ts";
import * as fs from "./src";
import { pipe } from "fp-ts/lib/function";

export const fixturesDir = path.resolve(__dirname, "./__temp/fixtures");

export interface FileArgsDeps {
  dir: string;
  content: string;
}

export const rWriteFile = pipe(
  RTE.ask<FileArgsDeps>(),
  R.map(TE.chain(({ dir, content }) => fs.writeFile(dir, content)))
);

export const rReadFile = pipe(
  RTE.asks((deps: FileArgsDeps) => deps.dir),
  R.map(TE.chain(fs.readFile()))
);

export const rUnlink = pipe(
  RTE.asks((deps: FileArgsDeps) => deps.dir),
  R.map(TE.chain(fs.unlink))
);
