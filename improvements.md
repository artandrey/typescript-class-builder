- [ ] Make builder configurable to add ability to ignore properties not marked with `@OptionalBuilderProperty`
- [x] Rename `createBuilderMethodFactory` to `toBuilder` as `toBuilderMethod(MyClass).withOptionals<MyClassOptionals>()` and `toBuilderMethod(MyClass).classAsOptionals()` ?
- [ ] Determine where generic type `TClass` is used as class type and class instance type and make it more explicit.
- [x] Choose package name. It should represent that it is class builder implementation. `class-builder` looks good, as it seems to be implicitly related to other class utilities such as `class-validator` and `class-transformer`.