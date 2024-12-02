import { InstantiableClazz } from './clazz';

export type ClazzInstance<T> = T extends InstantiableClazz<infer U> ? U : never;
