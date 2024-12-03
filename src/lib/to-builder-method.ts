// Rename `createBuilderMethodFactory` to `toBuilder` as `toBuilderMethod(MyClass).withOptionals<MyClassOptionals>()` and `toBuilderMethod(MyClass).classAsOptionals()` ?
import { ParametrizedBuilder } from './parametrized-builder';
import { ClazzInstance, IBuilder, InstantiableClazz } from './types';

export interface BuilderMethodFactory<TClass extends InstantiableClazz> {
  withOptionals<TOptionals>(): (...args: ConstructorParameters<TClass>) => IBuilder<TOptionals, ClazzInstance<TClass>>;
  classAsOptionals(): (...args: ConstructorParameters<TClass>) => IBuilder<TClass, ClazzInstance<TClass>>;
}

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
