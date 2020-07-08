export type EnforceNonEmptyArray<T extends Array<any>> = T extends Array<
  infer U
>
  ? T & { 0: U }
  : never;

export type PartialKeys<T extends Record<string, any>> = {
  [P in keyof T]: T extends { [K in P]-?: T[K] } ? never : P;
}[keyof T];
