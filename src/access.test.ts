import * as fc from "fast-check";
import { AccessMode } from "./access";

interface Model {
  name: AccessMode;
  max: number;
  success: ReturnType<typeof fc.integer>;
}

const zerozero = fc.integer(0, 0);
const zeroone = fc.integer(0, 1);
const zerotwo = fc.integer(0, 2);
const zerofour = fc.integer(0, 4);
const zerosix = fc.integer(0, 6);
const zeroseven = fc.integer(0, 7);

const models: Model[] = [
  {
    name: "visible",
    max: 0,
    success: zeroseven,
  },
  {
    name: "readable",
    max: 1,
    success: zeroseven,
  },
  {
    name: "writeable",
    max: 4,
    success: zeroseven,
  },
  {
    name: "executable",
    max: 7,
    success: zeroseven,
  },
];
