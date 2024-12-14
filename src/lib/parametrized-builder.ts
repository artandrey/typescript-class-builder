import { metadataStorage } from './storage';
import { Clazz, ClazzInstance, IBuilder, InstantiableClazz } from './types';
import { getClassPlainProperties } from './util/get-class-plain-properties';

function setAccessorsForClassProperties<TClass extends Clazz>(
  classConstructor: TClass,
  instance: ClazzInstance<TClass>,
) {
  const propertySet = getClassPlainProperties(instance);
  propertySet.forEach((property) => {
    const hasMetadata = !!metadataStorage.findBuilderAccessorsMetadata(classConstructor, property);
    // do not override existing getters and setters metadata
    if (!hasMetadata) {
      metadataStorage.addBuilderAccessorsMetadata({
        target: classConstructor,
        propertyKey: property,
        get: (target: object) => (target as Record<string, unknown>)[property],
        set: (target: object, value: unknown) => {
          (target as Record<string, unknown>)[property] = value;
        },
      });
    }
  });
  metadataStorage.addInitializedAccessorsClass(classConstructor);
}

/**
 * Creates a builder for a class with required constructor parameters and optional properties.
 *
 * @param classConstructor - The class to build
 * @param parameters - Required constructor parameters
 * @returns A builder instance that provides fluent methods for setting optional properties
 *
 */
export function ParametrizedBuilder<TClass extends InstantiableClazz, TOptionals = ClazzInstance<TClass>>(
  classConstructor: TClass,
  parameters: ConstructorParameters<TClass>,
): IBuilder<TOptionals, ClazzInstance<TClass>> {
  const instance: ClazzInstance<TClass> = new classConstructor(...parameters);

  if (!metadataStorage.hasInitializedAccessors(classConstructor)) {
    setAccessorsForClassProperties(classConstructor, instance);
  }

  const builder = new Proxy(
    {},
    {
      get(target, prop) {
        if ('build' === prop) {
          return () => {
            return instance;
          };
        }

        return (...args: unknown[]): unknown => {
          const propertyKey = String(prop);
          const privateKey = `_${propertyKey}`;

          const accessorMetadata =
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, propertyKey) ||
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, privateKey);

          if (0 === args.length) {
            if (accessorMetadata?.get) {
              return accessorMetadata.get(instance);
            }

            throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
          }

          const value = args[0];

          if (accessorMetadata?.set) {
            accessorMetadata.set(instance, value);
            return builder;
          }

          throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
        };
      },
    },
  );

  return builder as IBuilder<TOptionals, ClazzInstance<TClass>>;
}
