import { ParametrizedBuilder } from './parametrized-builder';
import { InstansicableClazz } from './types';

export function createBuilderMethodFactory<O>() {
  return function <C extends InstansicableClazz>(classConstructor: C) {
    return (...args: ConstructorParameters<C>) => {
      return ParametrizedBuilder<C, O>(classConstructor, args);
    };
  };
}
