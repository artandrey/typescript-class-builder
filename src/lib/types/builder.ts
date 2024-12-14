/**
 * Interface for a fluent builder pattern.
 * Provides getter/setter methods for each optional property and a build() method.
 *
 * @typeParam TOptionals - Type containing optional properties that can be set
 * @typeParam TClass - The class type being built
 *
 * @example
 * ```typescript
 * interface Options {
 *   optionalProperty?: string;
 * }
 *
 * const builder: Builder<Options, MyClass> = MyClass.builder('required');
 * const instance = builder
 *   .optionalProperty('value')  // Set value
 *   .optionalProperty()         // Get current value
 *   .build();                   // Create instance
 * ```
 */
export type Builder<TOptionals, TClass> = {
  [K in keyof TOptionals]-?: ((arg: TOptionals[K]) => Builder<TOptionals, TClass>) & (() => TOptionals[K]);
} & {
  build(): TClass;
};
