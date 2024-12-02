// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Clazz<T = any> = abstract new (...args: any[]) => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InstantiableClazz<T = any> = new (...args: any[]) => T;
