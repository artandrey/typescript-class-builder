# class-builder

## 0.1.0

### Minor Changes

- dfd462f: 1. Make properties lookup without decorators. Remove `@BuilderOptionalProperty` decorator to mark private properties. 2. Add `@BuilderAccessors` decorator to support getters and setters in type-safe way. 3. Implement access to properties using accessors from metadata to improve performance. 4. Move metadata storage and its types out of package exports. 5. Rename `IBuilder` type to `Builder`.

## 0.0.1

### Patch Changes

- Initial release. Includes tools to implement builder for classes that use constructor and aware of private fields.
