import {
  array as A,
  reader as R,
  readerTask as RT,
  task as T,
  taskEither as TE,
} from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import * as path from "path";
import { buffer as BF, fs as FS } from "../src";
import * as AS from "./assert";

type Fixture = {
  name: string;
  dir: string;
  contents: {
    utf8: string;
    buffer: Buffer;
  };
  size: number;
};

const rawFixtures = [
  {
    name: "characters_1024",
    relative: "./characters-1024",
    utf8:
      "H2kMvq7qUuw3qOI0ZwXBhPn6kn3yvPPyeMpAGJ5bYeKNpDDtWgo4IPnoDIsnjRgFEW4MzddoBPtIx9ZsO9iuUk0X0khYm6BAxOihKWNmBhDmezSYql6fn9nhUEtnC0z7hbgQQWlImBobL6d85z4HLFFvkuFXRwMoUTHIoWx9tAxP5aLOi5NrOgCPY2GC5cm3n4sd0kxbASCLMLXNc4iZDZw0y3CVD6kQ8et8mPzm0FuoLUYqF5q6qOVT78A5VFqwP2zs0LdEy5Bth42lqIdi9UYHW9QjVzYVI3gRo0bk37HFuK51xD780ini49eyg5RL8Af10JC8csU6E5Q1yYuRY4JE6VNpYfmpfQX15GN30Ix81u6UJPW0eYaUrwOCCPcg1OgEyEiFticCs85qZZaWXJCMKgSdrupeS073qepKtEFUHvvrv5AcpGWdXOwgsoZvGUecNwyi4538jL504hoNZQJI8dqW8lQXvA24lYiTmMOBj0We7enWvZ4xo4PCi5Ceq6Nm3EPBQZVbbf5xGSLBoFMqweD7gLvet7ieMiKfQSiIXffGTLIzYmYzq0LoqUfN32NfzFceOg3kUN0Hnez3METAuBKNaZqFRF5C8AvFPqdVAr4gpo2k5YeFkp158g5xQ0qzpXaC5W0VqBpDPAE9ex0zMPJ1DcuwrG7HxgkURjqOdrpJowRRAGjPRKKVHuWkT9Sl9maVfSbqlfntXatiQ6rcd1gL5nJsfP0N089CweyvNBj4gRJDO1E4Tfp7nbHLk8bwKCo27ZRSzrXTOORo9wFWhn5SY539Yvt5UlGo6FVbkjC3yno84xTQ8Lj0s4MJumFqCWPNGscgWQKZ2RjnxyEBZUIjK3kNosPkbSowrltHi4X4lxMy67FPcuVepYsXZTOQbzvQcIFQstlc6rXZ9LSC2FMEg5VOWpDZGbwdZakQUDDDRKqnrb4TrpwrFPE1QTbXAAHKSX1kOMDj6c1YZkXnRop5DhTg124w7FNtIQY25jUmC5C1B9tI1jjrqv78",
    size: 1024,
  },
  {
    name: "empty",
    relative: "./empty-file",
    utf8: "",
    size: 0,
  },
];

const fixtures: Array<Fixture> = pipe(
  rawFixtures,
  A.map(({ name, relative, utf8, size }) => ({
    name,
    dir: path.resolve(__dirname, "./fixtures", relative),
    contents: {
      utf8,
      buffer: pipe(utf8, BF.decode("utf-8")),
    },
    size,
  }))
);

describe("fs", () => {
  describe.each(fixtures)(
    "readFile",
    ({ name, contents: { utf8, buffer }, dir }: Fixture) => {
      const setup = pipe(dir, FS.readFile(), T.chainIOK(AS.failLeft));

      describe(name, () => {
        test("reads the file", setup);

        test(
          "buffer",
          pipe(setup, T.chainFirst(T.fromIOK(AS.deepStrictEqual(buffer))))
        );

        test(
          "utf8",
          pipe(setup, T.map(BF.encode()), T.chainIOK(AS.strictEqual(utf8)))
        );
      });
    }
  );

  const octalMap = flow(
    A.map((n: number) => `0o00${n}`),
    A.map((string) => ({ string, number: Number(string) as FS.FileMode }))
  );

  const failableOctals = pipe([1, 3, 5, 7], octalMap);
  // exists, read, write and the intersection of all these
  const passableOctals = pipe([0, 2, 4, 6], octalMap);

  describe.each(fixtures)("access", ({ name, dir }) => {
    describe(name, () => {
      describe.each(failableOctals)("fail", ({ string, number }) => {
        test(string, pipe(dir, FS.access(number), T.chainIOK(AS.failRight)));
      });

      describe.each(passableOctals)("pass", ({ string, number }) => {
        test(string, pipe(dir, FS.access(number), T.chainIOK(AS.failLeft)));
      });
    });
  });

  const destination = path.resolve(__dirname, "./fixtures", "newfile");

  describe("writeFile", () => {
    test(
      "writes the file",
      pipe(
        // todo - this flag should report an error if the file wasn't unlinked.
        FS.writeFile({ flags: "ax" }),
        R.ap(R.of(BF.zero())),
        RT.chainIOK(AS.failLeft)
      )(destination)
    );

    test(
      "newly created file exists",
      pipe(FS.access(0o000), RT.chainIOK(AS.failLeft))(destination)
    );
  });

  describe("unlink", () => {
    test(
      "removes the file",
      pipe(FS.unlink, RT.chainIOK(AS.failLeft))(destination)
    );

    test(
      "recently removed file no longer exist",
      pipe(FS.access(0o000), RT.chainIOK(AS.failRight))(destination)
    );
  });

  describe("stats", () => {
    const { dir, size } = fixtures[0];
    test(
      "get the stats",
      pipe(
        FS.stat(dir),
        TE.map((a) => a.size),
        T.chainIOK(AS.failLeft),
        T.chainIOK(AS.strictEqual(size))
      )
    );
  });

  describe("link", () => {
    const from = path.resolve(__dirname, "./fixtures", "hard_link_target");
    const to = path.resolve(__dirname, "./fixtures", "hard_link_to");

    test(
      "create the hard link",
      pipe(FS.link(to), RT.chainIOK(AS.failLeft))(from)
    );

    test(
      "ensure file exist",
      pipe(FS.access(0o000), RT.chainIOK(AS.failLeft))(to)
    );

    test(
      "compare inodes of 'from' and 'to' for equality",
      pipe(
        FS.stat(to),
        TE.bindTo("to"),
        TE.bind("from", () => FS.stat(from)),
        T.chainIOK(AS.failLeft),
        // surely there's a better way. EQ.contramap?
        T.chainIOK(({ from: { ino: from }, to: { ino: to } }) =>
          AS.strictEqual(from)(to)
        )
      )
    );

    test("removes the hard link", pipe(FS.unlink(to), T.chainIOK(AS.failLeft)));
  });
});
