- [x] Rename `createBuilderMethodFactory` to `toBuilder` as `toBuilderMethod(MyClass).withOptionals<MyClassOptionals>()` and `toBuilderMethod(MyClass).classAsOptionals()` ?
- [x] Determine where generic type `TClass` is used as class type and class instance type and make it more explicit.
- [x] Choose package name. It should represent that it is class builder implementation. `class-builder` looks good, as it seems to be implicitly related to other class utilities such as `class-validator` and `class-transformer`.
- [x] Improve performance of direct filer access by adding setter function for each class to accessors metadata instead of `instance[propertyKey] = value`
- [x] Update README.md to describe latest api
- [x] Make metadataStorage private with all its types
- [x] Move classesWithInitializedAccessors from [parametrized-builder.ts](./src/lib/parametrized-builder.ts) to metadataStorage

- [x] Replace proxy with prototype to improve performance
- [x] Move builderObject to metadataStorage
