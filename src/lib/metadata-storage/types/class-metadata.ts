import { Clazz } from '../../types/clazz';

export type ClassPropertyMetadata<T> = T & {
  target: Clazz;
  propertyKey: PropertyKey;
};

export type ClassMetadata<T> = T & {
  target: Clazz;
};
