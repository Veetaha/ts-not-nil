import { ReasonOrCompileErr, NotNilAssertionCompileError } from "./compile-error";
import { AreSame } from "ts-typedefs";

type AssertTrue<T extends true> = T;


export namespace ReasonOrCompileErr_TypeTest {
    export namespace success_path {
        export namespace expect_to_expand_to_the_tuple_of_a_single_optional_string {
            type TestFor<T> = AreSame<ReasonOrCompileErr<T>, [string?]>;
            export namespace when_parameter_is_a_union_that_contains_undefined {

                export type t1 = AssertTrue<TestFor<undefined>>;
                export type t2 = AssertTrue<TestFor<undefined | number>>;
                export type t3 = AssertTrue<TestFor<undefined | {}>>;
                export type t4 = AssertTrue<TestFor<undefined | number | {}>>;
                export type t5 = AssertTrue<TestFor<undefined | number | {} | ((...p: any[]) => never)>>;

            }
            export namespace when_parameter_is_a_union_that_contains_null {

                export type t1 = AssertTrue<TestFor<null>>;
                export type t2 = AssertTrue<TestFor<null | number>>;
                export type t3 = AssertTrue<TestFor<null | {}>>;
                export type t4 = AssertTrue<TestFor<null | number | {}>>;
                export type t5 = AssertTrue<TestFor<null | number | {} | ((...p: any[]) => never)>>;

            }

            export namespace when_parameter_is_a_union_that_contains_both_null_and_undefined {

                export type t1 = AssertTrue<TestFor<undefined | null>>;
                export type t2 = AssertTrue<TestFor<undefined | null | number>>;
                export type t3 = AssertTrue<TestFor<undefined | null | {}>>;
                export type t4 = AssertTrue<TestFor<undefined | null | number | {}>>;
                export type t5 = AssertTrue<TestFor<undefined | null | number | {} | ((...p: any[]) => never)>>;

            }

            export namespace when_parameter_is_the_type_any {

                export type t1 = AssertTrue<TestFor<any>>;

            }
            export namespace when_parameter_is_the_type_unknown {

                export type t1 = AssertTrue<TestFor<unknown>>;

            }
        }
    }

    export namespace ErrorPath {
        export namespace expect_to_expand_to_the_tuple_of_a_single_NotNilAssertionCompileError {
            type TestFor<T> = AreSame<ReasonOrCompileErr<T>, [NotNilAssertionCompileError]>;

            export namespace when_parameter_is_a_number {
                export type t1 = AssertTrue<TestFor<number>>;
                export type t2 = AssertTrue<TestFor<0>>;
                export type t3 = AssertTrue<TestFor<-0>>;
                export type t4 = AssertTrue<TestFor<1>>;
                export type t5 = AssertTrue<TestFor<-1>>;
                export type t6 = AssertTrue<TestFor<42>>;
                export type t7 = AssertTrue<TestFor<-42>>;
                export type t8 = AssertTrue<TestFor<0.3>>;
                export type t9 = AssertTrue<TestFor<-0.3>>;
                export type t10 = AssertTrue<TestFor<123456789_1_123456789_2_123456789_3_123456789_4_123456789_5_123456789>>;
                export type t11 = AssertTrue<TestFor<-123456789_1_123456789_2_123456789_3_123456789_4_123456789_5_123456789>>;
            }
            export namespace when_parameter_is_a_string {
                export type t1 = AssertTrue<TestFor<string>>;
                export type t2 = AssertTrue<TestFor<"">>;
                export type t3 = AssertTrue<TestFor<"the string!">>;
            }
            export namespace when_parameter_is_a_bigint {
                export type t1 = AssertTrue<TestFor<bigint>>;
                export type t2 = AssertTrue<TestFor<0n>>;
                export type t3 = AssertTrue<TestFor<-0n>>;
                export type t4 = AssertTrue<TestFor<1n>>;
                export type t5 = AssertTrue<TestFor<-1n>>;
                export type t6 = AssertTrue<TestFor<42n>>;
                export type t7 = AssertTrue<TestFor<-42n>>;
                export type t8 = AssertTrue<TestFor<123456789_1_123456789_2_123456789_3_123456789_4_123456789_5_123456789n>>;
                export type t9 = AssertTrue<TestFor<-123456789_1_123456789_2_123456789_3_123456789_4_123456789_5_123456789n>>;
            }
            export namespace when_parameter_is_a_boolean {
                export type t1 = AssertTrue<TestFor<boolean>>;
                export type t2 = AssertTrue<TestFor<true>>;
                export type t3 = AssertTrue<TestFor<false>>;
            }
            export namespace when_parameter_is_a_symbol {
                declare const UNIQUE_SYMBOL: unique symbol;
                export type t1 = AssertTrue<TestFor<typeof UNIQUE_SYMBOL>>;
                export type t2 = AssertTrue<TestFor<symbol>>;
            }
            export namespace when_parameter_is_a_union_of_primitive_types_that_doesnt_contain_null_or_undefined {
                export type t1 = AssertTrue<TestFor<number | string>>;
                export type t2 = AssertTrue<TestFor<boolean | symbol>>;
                export type t3 = AssertTrue<TestFor<bigint | number>>;
                export type t4 = AssertTrue<TestFor<number | string | symbol>>;
                export type t5 = AssertTrue<TestFor<number | string | symbol | bigint>>;
                export type t6 = AssertTrue<TestFor<number | string | symbol | bigint | boolean>>;
            }

            export namespace when_parameter_is_a_function {
                export type t1 = AssertTrue<TestFor<() => any>>;
                export type t2 = AssertTrue<TestFor<(a: number) => any>>;
                export type t3 = AssertTrue<TestFor<(a: number, b: string) => any>>;
                export type t4 = AssertTrue<TestFor<(...p: any[]) => any>>;
                export type t5 = AssertTrue<TestFor<(...p: any[]) => Promise<any>>>;
                export type t6 = AssertTrue<TestFor<(...p: any[]) => Iterator<any>>>;
                export type t7 = AssertTrue<TestFor<(...p: any[]) => Iterator<Promise<any>>>>;
                export type t8 = AssertTrue<TestFor<Function>>;
                export type t9 = AssertTrue<TestFor<GeneratorFunction>>;
            }

            export namespace when_parameter_is_a_literal_object_type {
                export type t1 = AssertTrue<TestFor<{}>>;
                export type t2 = AssertTrue<TestFor<{ a: string }>>;
                export type t3 = AssertTrue<TestFor<{ a: string, b: bigint }>>;
            }
            export namespace when_parameter_is_an_interface_object_type {
                interface EmptyInterface {}
                interface InterfaceWithOneProp { a: string; }
                interface InterfaceWithTwoProps { a: string; b: bigint; }
                export type t1 = AssertTrue<TestFor<EmptyInterface>>;
                export type t2 = AssertTrue<TestFor<InterfaceWithOneProp>>;
                export type t3 = AssertTrue<TestFor<InterfaceWithTwoProps>>;
            }

            export namespace when_parameter_is_an_array_type {
                export type t1 = AssertTrue<TestFor<{}[]>>;
                export type t2 = AssertTrue<TestFor<{}[][]>>;
                export type t3 = AssertTrue<TestFor<number[]>>;
                export type t4 = AssertTrue<TestFor<any[]>>;
                export type t5 = AssertTrue<TestFor<never[]>>;
            }
            export namespace when_parameter_is_an_tuple_type {
                export type t1 = AssertTrue<TestFor<[]>>;
                export type t2 = AssertTrue<TestFor<[{}]>>;
                export type t3 = AssertTrue<TestFor<[[{}]]>>;
                export type t4 = AssertTrue<TestFor<[number]>>;
                export type t5 = AssertTrue<TestFor<[number, string]>>;
                export type t6 = AssertTrue<TestFor<[number?]>>;
                export type t7 = AssertTrue<TestFor<[number?, string?]>>;
                export type t8 = AssertTrue<TestFor<[any]>>;
                export type t9 = AssertTrue<TestFor<[never]>>;
            }

            export namespace when_parameter_is_a_union_of_primitive_and_reference_types {
                export type t1 = AssertTrue<TestFor<{} | number>>;
                export type t2 = AssertTrue<TestFor<{ a: number } | string>>;
                export type t3 = AssertTrue<TestFor<[] | string>>;
                export type t4 = AssertTrue<TestFor<{} | number | string>>;
                export type t5 = AssertTrue<TestFor<((a: number) => any) | number | { a: string}>>;
            }

            export namespace when_parameter_is_the_type_never {
                export type t1 = AssertTrue<TestFor<never>>;
            }
        }
    }
}

describe("NotNilAssertionCompileError", () => {
  it("passed all static type tests", () => {});
});
