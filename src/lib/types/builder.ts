export type IBuilder<T, C> = {
  [k in keyof T]-?: ((arg: T[k]) => IBuilder<T, C>) & (() => T[k]);
} & {
  build(): C;
};
