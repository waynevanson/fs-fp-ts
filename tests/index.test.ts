import { array as A, task as T } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
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
};

const rawFixtures = [
  {
    name: "characters_1024",
    relative: "./characters-1024",
    utf8:
      "H2kMvq7qUuw3qOI0ZwXBhPn6kn3yvPPyeMpAGJ5bYeKNpDDtWgo4IPnoDIsnjRgFEW4MzddoBPtIx9ZsO9iuUk0X0khYm6BAxOihKWNmBhDmezSYql6fn9nhUEtnC0z7hbgQQWlImBobL6d85z4HLFFvkuFXRwMoUTHIoWx9tAxP5aLOi5NrOgCPY2GC5cm3n4sd0kxbASCLMLXNc4iZDZw0y3CVD6kQ8et8mPzm0FuoLUYqF5q6qOVT78A5VFqwP2zs0LdEy5Bth42lqIdi9UYHW9QjVzYVI3gRo0bk37HFuK51xD780ini49eyg5RL8Af10JC8csU6E5Q1yYuRY4JE6VNpYfmpfQX15GN30Ix81u6UJPW0eYaUrwOCCPcg1OgEyEiFticCs85qZZaWXJCMKgSdrupeS073qepKtEFUHvvrv5AcpGWdXOwgsoZvGUecNwyi4538jL504hoNZQJI8dqW8lQXvA24lYiTmMOBj0We7enWvZ4xo4PCi5Ceq6Nm3EPBQZVbbf5xGSLBoFMqweD7gLvet7ieMiKfQSiIXffGTLIzYmYzq0LoqUfN32NfzFceOg3kUN0Hnez3METAuBKNaZqFRF5C8AvFPqdVAr4gpo2k5YeFkp158g5xQ0qzpXaC5W0VqBpDPAE9ex0zMPJ1DcuwrG7HxgkURjqOdrpJowRRAGjPRKKVHuWkT9Sl9maVfSbqlfntXatiQ6rcd1gL5nJsfP0N089CweyvNBj4gRJDO1E4Tfp7nbHLk8bwKCo27ZRSzrXTOORo9wFWhn5SY539Yvt5UlGo6FVbkjC3yno84xTQ8Lj0s4MJumFqCWPNGscgWQKZ2RjnxyEBZUIjK3kNosPkbSowrltHi4X4lxMy67FPcuVepYsXZTOQbzvQcIFQstlc6rXZ9LSC2FMEg5VOWpDZGbwdZakQUDDDRKqnrb4TrpwrFPE1QTbXAAHKSX1kOMDj6c1YZkXnRop5DhTg124w7FNtIQY25jUmC5C1B9tI1jjrqv78",
  },
  {
    name: "empty",
    relative: "./empty-file",
    utf8: "",
  },
];

const fixtures: Array<Fixture> = pipe(
  rawFixtures,
  A.map(({ name, relative, utf8 }) => ({
    name,
    dir: path.resolve(__dirname, "./fixtures", relative),
    contents: {
      utf8,
      buffer: pipe(utf8, BF.decode("utf-8")),
    },
  }))
);

describe("fs", () => {
  describe.each(fixtures)(
    "readFile",
    ({ name, contents: { utf8, buffer }, dir }: Fixture) => {
      const tdawgs = pipe(dir, FS.readFile(), T.chainIOK(AS.failLeft()));

      describe(name, () => {
        test("reads the file", tdawgs);

        test(
          "buffer",
          pipe(tdawgs, T.chainFirst(T.fromIOK(AS.deepStrictEqual(buffer))))
        );

        test(
          "utf8",
          pipe(tdawgs, T.map(BF.encode()), T.chainIOK(AS.strictEqual(utf8)))
        );
      });
    }
  );
});
