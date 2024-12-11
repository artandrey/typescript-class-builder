import { metadataStorage } from './storage';
import { ClazzInstance, IBuilder, InstantiableClazz } from './types';

const propertySetCache = new WeakMap<InstantiableClazz, Set<string>>();

function getPropertySet<TClass extends InstantiableClazz>(classConstructor: TClass, instance: TClass): Set<string> {
  let propertySet = propertySetCache.get(classConstructor);

  if (!propertySet) {
    const propertyNames = Object.getOwnPropertyNames(instance);
    propertySet = new Set(
      propertyNames.filter((propertyName) => {
        const descriptor = Object.getOwnPropertyDescriptor(instance, propertyName);
        return descriptor && !descriptor.get && !descriptor.set;
      }),
    );

    propertySetCache.set(classConstructor, propertySet);
  }

  return propertySet;
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

  const propertySet = getPropertySet(classConstructor, instance);
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
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, privateKey) ||
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, propertyKey);

          if (0 === args.length) {
            if (accessorMetadata?.get) {
              return accessorMetadata.get(instance);
            }

            if (propertySet.has(propertyKey)) {
              return instance[propertyKey as keyof TClass];
            }
            if (propertySet.has(privateKey)) {
              return instance[privateKey as keyof TClass];
            }

            throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
          }

          const value = args[0];

          if (accessorMetadata?.set) {
            accessorMetadata.set(instance, value);
            return builder;
          }

          if (propertySet.has(propertyKey)) {
            instance[propertyKey as keyof TClass] = value as TClass[keyof TClass];
            return builder;
          }

          if (propertySet.has(privateKey)) {
            instance[privateKey as keyof TClass] = value as TClass[keyof TClass];
            return builder;
          }

          throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
        };
      },
    },
  );

  return builder as IBuilder<TOptionals, ClazzInstance<TClass>>;
}
