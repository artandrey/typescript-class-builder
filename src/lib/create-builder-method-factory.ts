import { ParametrizedBuilder } from './parametrized-builder';
import { InstantiableClazz } from './types';

/**
 * Creates a builder factory method for a class that can be used as a static method.
 *
 *
 * @example
 * ```typescript
 * interface MyClassOptionals {
 *   optionalProperty?: string;
 * }
 *
 * class MyClass {
 *   private _requiredProperty: string;
 *   @OptionalBuilderProperty()
 *   private _optionalProperty?: string;
 *
 *   constructor(requiredProperty: string) {
 *     this._requiredProperty = requiredProperty;
 *   }
 *
 *   // Define static builder method
 *   public static builder = createBuilderMethodFactory<MyClassOptionals>()(MyClass);
 * }
 *
 * // Usage:
 * const instance = MyClass.builder('required property')
 *   .optionalProperty('optional value')
 *   .build();
 * ```
 */
export function createBuilderMethodFactory<TOptionals>() {
  return function <TClass extends InstantiableClazz>(classConstructor: TClass) {
    return (...args: ConstructorParameters<TClass>) => {
      return ParametrizedBuilder<TClass, TOptionals>(classConstructor, args);
    };
  };
}
