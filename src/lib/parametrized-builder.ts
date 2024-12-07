import { metadataStorage } from './storage';
import { ClassMetadata, ClazzInstance, IBuilder, InstantiableClazz } from './types';
import { BuilderAccessorsMetadata } from './types/builder-accessors-metadata';

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
            return instance;
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
