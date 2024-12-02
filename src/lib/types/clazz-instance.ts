import { InstansicableClazz } from './clazz';

export type ClazzInstance<T> = T extends InstansicableClazz<infer U> ? U : never;
