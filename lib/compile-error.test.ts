import { ReasonOrCompileErr, NotNilAssertionCompileError } from "./compile-error";
import { AreSame } from "ts-typedefs";

type AssertTrue<T extends true> = T;


export namespace ReasonOrCompileErr_TypeTest {

  export namespace SuccessPath {

    export type t1 = AssertTrue<AreSame<
      ReasonOrCompileErr<undefined>, [string?]
    >>;
    
    export type t2 = AssertTrue<AreSame<
      ReasonOrCompileErr<null>, [string?]
    >>;

    export type t3 = AssertTrue<AreSame<
      ReasonOrCompileErr<{} | null>, [string?]
    >>;

    export type t4 = AssertTrue<AreSame<
      ReasonOrCompileErr<any>, [string?]
    >>;

    export type t5 = AssertTrue<AreSame<
      ReasonOrCompileErr<unknown>, [string?]
    >>;
  }

  export namespace ErrorPath {

    export type t1 = AssertTrue<AreSame<
      ReasonOrCompileErr<string>, [NotNilAssertionCompileError]
    >>;

    export type t2 = AssertTrue<AreSame<
      ReasonOrCompileErr<{}>, [NotNilAssertionCompileError]
    >>;

    export type t3 = AssertTrue<AreSame<
      ReasonOrCompileErr<never>, [NotNilAssertionCompileError]
    >>;
  }
}

describe("NotNilAssertionCompileError", () => {
  it("passed all static type tests", () => {});
});
