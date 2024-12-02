import { metadataStorage } from './storage';
import { Clazz, ClazzInstance, IBuilder, InstansicableClazz } from './types';

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

export function ParametrizedBuilder<T extends InstansicableClazz, O = ClazzInstance<T>>(
  classConstructor: T,
  parameters: ConstructorParameters<T>,
  template?: Partial<O> | null,
  override?: Partial<O> | null,
): IBuilder<O, ClazzInstance<T>> {
  const built: Record<string, unknown> = template ? Object.assign({}, template) : {};

  const builder = new Proxy(
    {},
    {
      get(target, prop) {
        if ('build' === prop) {
          if (override) {
            Object.assign(built, override);
          }
          const obj: T = new classConstructor(...parameters);

          return () => {
            try {
              return Object.assign(
                obj as T & Record<string, unknown>,
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
          if (0 === args.length) {
            return built[prop.toString()];
          }

          built[prop.toString()] = args[0];
          return builder;
        };
      },
    },
  );

  return builder as IBuilder<O, ClazzInstance<T>>;
}
