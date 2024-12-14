import { Clazz } from './clazz';

export type ClassPropertyMetadata<T> = T & {
  target: Clazz;
  propertyKey: PropertyKey;
};

export type ClassMetadata<T> = T & {
  target: Clazz;
};
