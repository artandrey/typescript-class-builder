/**
 * Represents an abstract class constructor type.
 * @template T The instance type of the class, defaults to any
 * @returns A constructor type that creates instances of T
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Clazz<T = any> = abstract new (...args: any[]) => T;

/**
 * Represents a concrete (instantiable) class constructor type.
 * @template T The instance type of the class, defaults to any
 * @returns A constructor type that creates instances of T
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InstantiableClazz<T = any> = new (...args: any[]) => T;
