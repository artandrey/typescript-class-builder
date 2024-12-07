import { metadataStorage } from './storage';
import { ClassMetadata, Clazz, ClazzInstance, IBuilder, InstantiableClazz } from './types';
import { BuilderAccessorsMetadata } from './types/builder-accessors-metadata';

function mapDesiredToActualOrReturnAsIs(target: Clazz, values: Record<string, unknown>) {
  const mappings = metadataStorage.getOptionalProperties(target.prototype);

  if (!mappings) return values;

  const asIs = Object.keys(values)
    .filter((key) => !mappings.some((mapping) => mapping.desiredPropertyKey === key))
    .reduce(
      (asIs, key) => {
        asIs[key] = values[key];
        return asIs;
      },
      {} as Record<string, unknown>,
    );

  const result = mappings.reduce(
    (result, mapping) => {
      if (!(mapping.desiredPropertyKey in values)) {
        return result;
      }
      const value = values[mapping.desiredPropertyKey];
      if (typeof mapping.propertyKey === 'symbol') {
        throw new Error(
          `Spotted symbol property during building class: ${target.name}. Symbol as property key is not supported. Property: ${mapping.propertyKey.toString()}`,
        );
      }
      result[mapping.propertyKey] = value;
      return result;
    },
    { ...asIs } as Record<string, unknown>,
  );

  return result;
}

/**
 * Creates a builder for a class with required constructor parameters and optional properties.
 *
 * @param classConstructor - The class to build
 * @param parameters - Required constructor parameters
 *
 * @example
 * ```typescript
 * class MyClass {
 *   @OptionalBuilderProperty()
 *   private _optionalProperty?: string;
 *
 *   constructor(public requiredProperty: string) {}
 * }
 *
 * // Basic usage
 * const instance = ParametrizedBuilder(MyClass, ['required'])
 *   .optionalProperty('optional')
 *   .build();
 *
 * // With template
 * const withTemplate = ParametrizedBuilder(
 *   MyClass,
 *   ['required'],
 *   { optionalProperty: 'template' }
 * ).build();
 *
 * // With override
 * const withOverride = ParametrizedBuilder(
 *   MyClass,
 *   ['required'],
 *   null,
 *   { optionalProperty: 'override' }
 * ).build();
 * ```
 */
export function ParametrizedBuilder<TClass extends InstantiableClazz, TOptionals = ClazzInstance<TClass>>(
  classConstructor: TClass,
  parameters: ConstructorParameters<TClass>,
): IBuilder<TOptionals, ClazzInstance<TClass>> {
  const built: Record<string, unknown> = {};
  const instance: TClass = new classConstructor(...parameters);
  const propertyNames = Object.getOwnPropertyNames(instance);

  const propertyNamePropertyDescriptorMap = new Map(
    propertyNames
      .map((propertyName) => [propertyName, Object.getOwnPropertyDescriptor(instance, propertyName)] as const)
      .filter(([, descriptor]) => descriptor && !descriptor.get && !descriptor.set),
  );

  const builder = new Proxy(
    {},
    {
      get(target, prop) {
        if ('build' === prop) {
          return () => {
            try {
              return Object.assign(
                instance as TClass & Record<string, unknown>,
                mapDesiredToActualOrReturnAsIs(classConstructor, built) as object,
              );
            } catch (error) {
              if (error instanceof Error) {
                throw new Error(
                  `${error.message}. Probably you forgot to add @OptionalBuilderProperty() decorator to private property with underscore and builder is trying to reach it through getter`,
                );
              }
              throw error;
            }
          };
        }

        return (...args: unknown[]): unknown => {
          // If no arguments passed return current value.
          const propertyKey = prop.toString();
          const accessorsMetadata = [
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, propertyKey),
            metadataStorage.findBuilderAccessorsMetadata(classConstructor, `_${propertyKey}`),
          ]
            .filter(Boolean)
            .flat() as ClassMetadata<BuilderAccessorsMetadata>[];

          if (0 === args.length) {
            for (const accessorMetadata of accessorsMetadata) {
              if (accessorMetadata.get) {
                return accessorMetadata.get(instance);
              }
            }

            if (propertyNamePropertyDescriptorMap.get(propertyKey)) {
              return instance[propertyKey as keyof TClass];
            }
            if (propertyNamePropertyDescriptorMap.get(`_${propertyKey}`)) {
              return instance[`_${propertyKey}` as keyof TClass];
            }

            throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
          }

          for (const accessorMetadata of accessorsMetadata) {
            if (accessorMetadata.set) {
              accessorMetadata.set(instance, args[0]);
              return builder;
            }
          }

          if (propertyNamePropertyDescriptorMap.get(propertyKey)) {
            instance[propertyKey as keyof TClass] = args[0] as TClass[keyof TClass];
            return builder;
          }
          if (propertyNamePropertyDescriptorMap.get(`_${propertyKey}`)) {
            instance[`_${propertyKey}` as keyof TClass] = args[0] as TClass[keyof TClass];
            return builder;
          }

          throw new Error(`Property ${propertyKey} is not found in class ${classConstructor.name}`);
        };
      },
    },
  );

  return builder as IBuilder<TOptionals, ClazzInstance<TClass>>;
}
