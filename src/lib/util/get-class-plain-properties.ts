export function getClassPlainProperties<TClass extends object>(instance: TClass): Set<string> {
  const propertyNames = Object.getOwnPropertyNames(instance);
  return new Set(
    propertyNames.filter((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(instance, propertyName);
      return descriptor && !descriptor.get && !descriptor.set;
    }),
  );
}
