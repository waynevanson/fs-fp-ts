/**
 * @since 0.0.0
 */
/// <reference types="node" />
import { PartialKeys } from "./helper-types";
/**
 * @summary
 * An identity function that always
 * types the output as `NodeJS.ErrnoException`
 *
 * @since 0.0.0
 */
export declare function enforceErrnoException(e: any): NodeJS.ErrnoException;
/**
 * @summary
 * Use to enforce that all properties in a `Record` are present.
 *
 * If they're not, the callback (`fa`) returns all partial fields as non-nullable fields.
 *
 * @since 0.0.0
 *
 */
export declare function enforcePartialFields<T extends Record<string, any> = never>(fa: (a: T) => Required<Pick<T, PartialKeys<T>>>): (a: T) => Required<T>;
