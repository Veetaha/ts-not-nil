import {If, Or, UnionIncludes, IsUnknown} from "ts-typedefs";


declare const PHANTOM_TAG: unique symbol;

/**
 * Type that triggers compile error during invocation of `assertNotNil(val)` or `unwrapNotNil(val)`
 * when `val` is known not to contain `null` or `undefined` at compile time.
 * If you found this error type in your code, please rethink whether the `*notNil()`
 * invocation it originated from is really necessary.
 *
 * If you do think your type `T` may be `null | undefined` you are encouraged
 * to explicitly declare so via a cast `val as T | null | undefined` or other way,
 * otherwise you should trust the static guarantee of `T` not being `null` or `undefined`
 * that TypeScript gives you via the type system.
 */
export interface NotNilAssertionCompileError {
  [PHANTOM_TAG]: "You are calling *notNil() assertion on a value that is known to not to null or undefined at compile time!";
}

type CanBeNil<T> = Or<[IsUnknown<T>, UnionIncludes<T, null>, UnionIncludes<T, undefined>]>;

export type ReasonOrCompileErr<T> = (
  If<(CanBeNil<T>),
    [string?],
//Else
    [NotNilAssertionCompileError]
  >
);
