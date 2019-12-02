import { assertNotNil, NotNilAssertionError, unwrapNotNil, AssertNotNilFn } from "./not-nil";
import { Nullable } from "ts-typedefs";
import { sharedExamplesFor, itBehavesLike } from "bdd-lazy-var";

sharedExamplesFor("throws NotNilAssertionError when null or undefined value was passed in", 
  (assertFn: AssertNotNilFn) => {

    it("throws NotNilAssertionError on null value", () => {
      expect(() => assertFn(null)).toThrow(NotNilAssertionError);
      expect(() => assertFn(null, "my_reason")).toThrow(NotNilAssertionError);
      expect(() => assertFn(null, "my_reason")).toThrow("my_reason");
    });
    
    it("throws NotNilAssertionError on undefined value", () => {
      expect(() => assertFn(undefined)).toThrow(NotNilAssertionError);
      expect(() => assertFn(undefined, "my_reason")).toThrow(NotNilAssertionError);
      expect(() => assertFn(undefined, "my_reason")).toThrow("my_reason");
    });

  }
);

describe("assertNotNil()", () => {
  describe("success path", () => {
    it("does nothing when passed not null or undefined", () => {
      expect(() => assertNotNil<Nullable<number>>(1 as Nullable<number>)).not.toThrow();
      expect(() => assertNotNil(0 as Nullable<number>)).not.toThrow();
      expect(() => assertNotNil("a" as Nullable<string>)).not.toThrow();
      expect(() => assertNotNil("" as Nullable<string>)).not.toThrow();
      expect(() => assertNotNil({} as Nullable<{}>)).not.toThrow();
      expect(() => assertNotNil({ a: "str" } as Nullable<{a: string}>)).not.toThrow();
      expect(() => assertNotNil([] as Nullable<[]>)).not.toThrow();
      expect(() => assertNotNil([1] as Nullable<[number]>)).not.toThrow();
      expect(() => assertNotNil((() => {}) as Nullable<Function>)).not.toThrow();
    });
  });

  describe("error path", () => itBehavesLike(
    "throws NotNilAssertionError when null or undefined value was passed in", assertNotNil
  ));
});

describe("unwrapNotNil()", () => {
  describe("success path", () => {
    it("returns the passed in value back if it is not null or undefined", () => {
      expect(unwrapNotNil(1 as Nullable<number>)).toStrictEqual(1);
      expect(unwrapNotNil(0 as Nullable<number>)).toStrictEqual(0);
      expect(unwrapNotNil("a" as Nullable<string>)).toStrictEqual("a");
      expect(unwrapNotNil("" as Nullable<string>)).toStrictEqual("");
      const obj1 = {};
      // tslint:disable:no-inferred-empty-object-type
      expect(unwrapNotNil(obj1 as Nullable<typeof obj1>)).toStrictEqual(obj1);
      const obj2 = { a: "str" };
      expect(unwrapNotNil(obj2 as Nullable<{a: string}>)).toStrictEqual(obj2);
      const arr1: [] = [];
      expect(unwrapNotNil(arr1 as Nullable<[]>)).toStrictEqual(arr1);
      const arr2 = [1];
      expect(unwrapNotNil(arr2 as Nullable<[number]>)).toStrictEqual(arr2);
      const fn1 = () => {};
      expect(unwrapNotNil(fn1 as Nullable<Function>)).toStrictEqual(fn1);
    });
  });

  describe("error path", () => itBehavesLike(
    "throws NotNilAssertionError when null or undefined value was passed in", unwrapNotNil
  ));

});

