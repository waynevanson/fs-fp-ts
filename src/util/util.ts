import { PartialKeys } from "./helper-types";

/**
 * @summary
 * An identity function that always
 * types the output as `NodeJS.ErrnoException`
 */
export function enforceErrnoException(e: unknown) {
  return e as NodeJS.ErrnoException;
}

/**
 * @summary
 * Use to enforce that all properties in a `Record` are present.
 *
 * If they're not, the callback (`fa`) returns all partial fields as non-nullable fields.
 */
export function enforcePartialFields<T extends Record<string, any> = never>(
  fa: (a: T) => Required<Pick<T, PartialKeys<T>>>
) {
  return (a: T) => ({ ...fa(a), ...a } as Required<T>);
}

export const isLiteral = <A>(a: A): a is A & Record<string, unknown> =>
  typeof a === "object" &&
  (a as Extract<A, object>).constructor.name === "Object";

/**
 * @summary
 * Checks and defines a typeguard asserting the type is an object literal or undefined.
 *
 * Used to check parameters in overloaded function calls.
 */
export const isOptions = <A>(
  a: A
): a is Extract<A, A & (Record<string, unknown> | undefined)> =>
  a === undefined || isLiteral(a);
