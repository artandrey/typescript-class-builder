// Rename `createBuilderMethodFactory` to `toBuilder` as `toBuilderMethod(MyClass).withOptionals<MyClassOptionals>()` and `toBuilderMethod(MyClass).classAsOptionals()` ?
import { ParametrizedBuilder } from './parametrized-builder';
import { Builder, ClassInstance, InstantiableClazz } from './types';

export interface BuilderMethodFactory<TClass extends InstantiableClazz> {
  withOptionals<TOptionals>(): (...args: ConstructorParameters<TClass>) => Builder<TOptionals, ClassInstance<TClass>>;
  classAsOptionals(): (...args: ConstructorParameters<TClass>) => Builder<TClass, ClassInstance<TClass>>;
}

/**
 * Creates a builder method factory for a class that can generate builders with different optional property configurations.
 *
 * @param clazz - The class to create a builder for
 * @returns A factory object with methods to create different types of builders
 *
 * @example
 * ```typescript
 *
 *  interface MyOptionals {
 *    optional?: string;
 *  }
 *
 *  class MyClass {
 *    constructor(public required: string) {}
 *    private _optional?: string;
 *
 *    static builder = toBuilderMethod(MyClass).withOptionals<MyOptionals>();
 *  }
 * ```
 */
export function toBuilderMethod<TClass extends InstantiableClazz>(clazz: TClass): BuilderMethodFactory<TClass> {
  return {
    withOptionals: <TOptionals>() => {
      return (...args: ConstructorParameters<TClass>) => {
        return ParametrizedBuilder<TClass, TOptionals>(clazz, args);
      };
    },
    classAsOptionals: () => {
      return (...args: ConstructorParameters<TClass>) => {
        return ParametrizedBuilder<TClass, TClass>(clazz, args);
      };
    },
  };
}
