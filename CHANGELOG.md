# class-builder

## 0.2.3

### Patch Changes

- 94efc69: Update documentation and JSDoc

## 0.2.2

### Patch Changes

- d0367fa: Change builder creation process: switch from Object.create to Object.setPrototypeOf to increase performance. Update documentation: add note about useDefineForClassFields property in tsconfig

## 0.2.1

### Patch Changes

- Fix issue with missing properties for `classAsOptionals` of `toBuilderMethod`

## 0.2.0

### Minor Changes

- f68e098: Replace ES6 Proxy with prebuilt builder objects using prototypes, which increased builder performance up to 3.3x times

## 0.1.0

### Minor Changes

- dfd462f: 1. Make properties lookup without decorators. Remove `@BuilderOptionalProperty` decorator to mark private properties. 2. Add `@BuilderAccessors` decorator to support getters and setters in type-safe way. 3. Implement access to properties using accessors from metadata to improve performance. 4. Move metadata storage and its types out of package exports. 5. Rename `IBuilder` type to `Builder`.

## 0.0.1

### Patch Changes

- Initial release. Includes tools to implement builder for classes that use constructor and aware of private fields.
