import { ReasonOrCompileErr } from "./compile-error";

/**
 * Error thrown only upon any of the invocations
 * `assertNotNil(null)` or `assertNotNil(undefined) or unwrapNotNil(null) or unwrapNotNil(undefined)`.
 */
export class NotNilAssertionError extends Error {}
NotNilAssertionError.prototype.name = "NotNilAssertionError";

/** 
 * `reason` parameter will be expicitly set to `NotNilAssertionCompileError` to trigger an error
 * when `T` is known to never be `null` or `undefiend` at compile time.
 */
export type AssertNotNilFn = <T>(val: T, ...reason: ReasonOrCompileErr<T>) => asserts val is NonNullable<T>;


/** 
 * `reason` parameter will be expicitly set to `NotNilAssertionCompileError` to trigger an error
 * when `T` is known to never be `null` or `undefiend` at compile time.
 */
export type UnwrapNotNilFn = <T>(val: T, ...reason: ReasonOrCompileErr<T>) => NonNullable<T>;

/**
 * Asserts that the given `val` is neither `null` nor `undefined`, otherwise aborts
 * the process.
 * If this function is invoked with `T` known not to be neither `null` nor `undefined` at
 * compile time, a compile-time error is genereted (via demanding the `reason` string
 * to be of `NotNilAssertionCompileError` which you may never construct).
 *
 * Beware that there is a `debugger` statement that is hit when the assertion fails
 * for debugging convenience.
 *
 * ```ts
 * const map = new Map<string, number>();
 * map.set("key", 42);
 *
 * const val: number | undefined = map.get("key");
 * assertNotNil(val, `I've added an entry with key "key" one line above!`);
 * 
 * val; // `string` - its type was narrowed to just string after assertion
 * ```
 * 
 * @throws NotNilAssertionError if and only if `val === null || vall === undefined`
 * 
 * @param val Value that is checked not to be `null` or `undefined`.
 * @param reason Optional reason that describes why you think `val` will never be `null` or `undefined`
 *               that will be used in the message of the error thrown from this function when assertion
 *               failed.
 */
export const assertNotNil: AssertNotNilFn = (val, reason = "<no reason specified>") => {
    if (val === null || val === undefined) {
        debugger;
        throw new NotNilAssertionError(
          `Not-nil assertion failed for value: ${val}, assertion reason: ${reason}`
        );
    }
};

/**
 * Same as `assertNotNil(val)` but has `NonNullable<T>` return type (it returns
 * val in case of success). This way you give up `asserts val is NonNullable<T>`
 * semantics provided by `assertNotNil(val)`, but simplify writing small
 * expressions by not having to create separate `assertNotNil(val)` statement.
 * 
 * ```ts
 * const map = new Map<string, number>();
 * 
 * // No need to create separate variables, assert for not-nil just inline
 * const val = unwrapNotNil(map.get("key")) + unwrapNotNil(map.get("key2"));
 * 
 * // Instead of:
 * // const v1 = map.get("key");
 * // const v2 = map.get("key2");
 * // assertNotNil(v1);
 * // assertNotNil(v2);
 * // const val = v1 + v2;
 * ```
 * 
 * @param val Value that is checked not to be `null` or `undefined` and returned in case of success.
 * @param reason Optional reason that describes why you think `val` will never be `null` or `undefined`
 *               that will be used in the message of the error thrown from this function when assertion
 *               failed.
 */
export const unwrapNotNil: UnwrapNotNilFn = (val, reason = "<no reason specified>") => {
    assertNotNil(val as unknown, reason as string);
    return val as any;
};
