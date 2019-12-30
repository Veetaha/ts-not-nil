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
  [PHANTOM_TAG]: "You are calling *notNil() assertion on a value that is known to not to be null or undefined at compile time!";
}

/**
 * Expands to `true` unit type if `T` denotes a type that allows for `null` or
 * `undefined` values, otherwise expands to `false`.
 *
 * @remarks
 * The types for which this alias should expand to `true` are the following:
 *
 * - `T | null | undefined`
 * - `T | null`
 * - `T | undefined`
 * - `unknown`
 * - `any`
 *
 * @param T Type that is checked to include `null` or `undefined` as it's possible value.
 */
type CanBeNil<T> = Or<[IsUnknown<T>, UnionIncludes<T, null>, UnionIncludes<T, undefined>]>;

/**
 * Expands to a tuple type that helps with genereting a conditional compile-time
 * parameters type error for `*notNil()` functions.
 *
 * @remarks
 * This type guards you from using `*notNil()` assertion functions on values
 * that do not contain `null` or `undefined` as their possible states according
 * to their TypeScript type information.
 *
 * If the given type `T` is a type to which either `null` or `undefined` is assignable
 * this alias expands to `[string?]` which denotes a normal usage of `*notNil()`
 * assetion functions by specifying and optional assertion reason message string parameter.
 * Otherwise this alias expands to `[NotNulAssertionCompileError]` that has to
 * cause a compile-time error on the call site of `*notNil()` assertion function
 * and signal to the programmer that he has a logically unnecessary check for
 * nullability in his code.
 * 
 * @param T Type that is checked to include `null` or `undefined` as it's possible value.
 */
export type ReasonOrCompileErr<T> = (
  If<(CanBeNil<T>),
    [string?],
//Else
    [NotNilAssertionCompileError]
  >
);
