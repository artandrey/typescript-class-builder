import { metadataStorage } from '../storage';
import { Clazz, StringPropertyKeyParameterDecorator } from '../types';
import { privateKeyToDesired } from '../util/private-key-to-desired';

export interface OptionalBuilderPropertyOptions {
  transformKey?: (value: string) => string;
}

type OptionalBuilderPropertyDecorator = (
  options?: OptionalBuilderPropertyOptions,
) => StringPropertyKeyParameterDecorator;

export const OptionalBuilderProperty: OptionalBuilderPropertyDecorator = (options) => {
  return (target: object, propertyKey: PropertyKey) => {
    if (typeof propertyKey !== 'string') {
      throw new Error('Unable to decorate non-string property with @OptionalBuilderProperty');
    }

    metadataStorage.addOptionalPropertyMetadata({
      target: target as Clazz,
      propertyKey,
      desiredPropertyKey: options?.transformKey?.(propertyKey) ?? privateKeyToDesired(propertyKey),
    });
  };
};
