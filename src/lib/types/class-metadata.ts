import { Clazz } from './clazz';

export type ClassMetadata<T> = T & {
  target: Clazz;
  propertyKey: PropertyKey;
};
