<h1 align="center">ts-not-nil</h1>

[![npm version](https://badge.fury.io/js/ts-not-nil.svg)](https://badge.fury.io/js/ts-not-nil)
[![Build Status](https://travis-ci.com/Veetaha/ts-not-nil.svg?branch=master)](https://travis-ci.com/Veetaha/ts-not-nil)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

A runtime assertion for preserving not-null and not-undefined invariants.

## :zap: Rationale

This package helps you to prevent nasty
`"Cannot read property 'a' of undefined/null"`
runtime error messages with some compile-time sanity checks (thanks to TypeScript).

This library exports two functions:
```ts
/* @throws NotNilAssertionError */
export function assertNotNil<T>(val: T, reason?: string): asserts val is NotNullable<T>;
/* @throws NotNilAssertionError */
export function unwrapNotNil<T>(val: T, reason?: string): NotNullable<T>;
```

If `val` happens to be `null` or `undefined`, these function throw `NotNilAssertionError` at runtime.
There is also a `debugger` statement that is hit when the assertion fails for debugging convenience.

If `val` is neither `null` nor `undefined` nothing happens.

The difference between `assertNotNil(val)` and `unwrapNotNil(val)` is that the former returns `val` back which is handy for inline assertions inside of expressions.

The second optional parameter `reason` will be embedded into the thrown error message in case of assertion failure.
```ts
const map = new Map<string, number>();
map.set("key", 42);

const foo: number | undefined = map.get("key");

assertNotNil(foo, `I've added an entry with key "key" one line above!`);

foo; // `string` - its type was narrowed to just string after assertion

const bar: number = unwrapNotNil(map.get("key"), "Believe me!"); // inline assertion

// All the following invocations throw
assertNotNil(null);
assertNotNil(undefined);
unwrapNotNil(null);
unwrapNotNil(undefined);
```

## :boom: Compile-time protection

Both of the exported functions help you to catch bugs at compile time.
They explicitly prohibit calling them with `T` that is known to be neither `null` nor `undefined` at compile time.
This is quite a hack with type system, that may generate a long error report, but
as long as you see which line it points to and see `assertNotNil(val)` or `unwrapNotNil(val)`
invocation you should rethink whether this assertion is really needed (because type system already ensures that val is not `null` or `undefined`).

```ts
declare const unkown:     unknown;
declare const any:        unknown;
declare const maybeNull:  string | null;
declare const maybeUndef: string | undefined;
declare const maybeNil:   string | null | undefined;
declare const string:     string;
declare const obj:        { a: number };

assertNotNil(unkown);     // ok
assertNotNil(any);        // ok
assertNotNil(maybeNull);  // ok
assertNotNil(maybeUndef); // ok
assertNotNil(maybeNil);   // ok
assertNotNil(string);     // compile-error: the value passed is known to never be nil
assertNotNil(obj);        // compile-error: the value passed is known to never be nil
```

:warning: Caveats

You should have `"strictNullChecks"` enabled in your `tsconfig.json` and that's all.
