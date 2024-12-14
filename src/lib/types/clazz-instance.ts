import { InstantiableClazz } from './clazz';

/**
 * Utility type that extracts the instance type from a class constructor.
 * @template T The class constructor type
 * @returns The instance type of the class
 */
export type ClassInstance<T> = T extends InstantiableClazz<infer U> ? U : never;
