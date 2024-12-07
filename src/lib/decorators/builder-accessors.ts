import { metadataStorage } from '../storage';
import { BuilderAccessorsMetadata } from '../types/builder-accessors-metadata';

export function BuilderAccessors<T extends object, V>(get: (target: T) => V, set: (target: T, value: V) => void) {
  return function (target: T, propertyKey: string): void {
    const metadata: BuilderAccessorsMetadata = {
      get: get as (target: object) => unknown,
      set: set as (target: object, value: unknown) => void,
    };

    metadataStorage.addBuilderAccessorsMetadata({
      target: target.constructor as new (...args: unknown[]) => unknown,
      propertyKey,
      ...metadata,
    });
  };
}
