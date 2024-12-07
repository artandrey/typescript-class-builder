import { metadataStorage } from '../storage';
import { BuilderAccessorsMetadata } from '../types/builder-accessors-metadata';

/**
 * Decorator that specifies custom getter and setter functions for a builder property.
 * This allows customizing how properties are accessed and modified during the build process.
 *
 * @param get - Function to get the property value from the target object
 * @param set - Function to set the property value on the target object
 * @returns PropertyDecorator function
 *
 * @example
 * ```typescript
 * class MyClass {
 *   @BuilderAccessors(
 *     (target) => target._property,
 *     (target, value) => target.property = value
 *   )
 *   private _property?: string;
 *
 *   set property(value: string) {
 *     this._property = value.toUpperCase();
 *   }
 * }
 * ```
 */
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
