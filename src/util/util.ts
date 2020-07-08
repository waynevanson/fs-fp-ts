import { PartialKeys } from "./helper-types";

/**
 * @summary
 * An identity function that always
 * types the output as `NodeJS.ErrnoException`
 *
 * @since 0.0.0
 */
export function enforceErrnoException(e: unknown) {
  return e as NodeJS.ErrnoException;
}

/**
 * @summary
 * Use to enforce that all properties in a `Record` are present.
 *
 * If they're not, the callback (`fa`) returns all partial fields as non-nullable fields.
 *
 * @since 0.0.0
 *
 */
export function enforcePartialFields<T extends Record<string, any> = never>(
  fa: (a: T) => Required<Pick<T, PartialKeys<T>>>
) {
  return (a: T) => ({ ...fa(a), ...a } as Required<T>);
}
