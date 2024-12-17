import { getMetadataStorage } from './storage';
import { Builder, ClassInstance, Clazz, InstantiableClazz } from './types';
import { getClassPlainProperties } from './util/get-class-plain-properties';
import { privateKeyToDesired } from './util/private-key-to-desired';

function setAccessorsForClassProperties<TClass extends Clazz>(
  classConstructor: TClass,
  instance: ClassInstance<TClass>,
) {
  const metadataStorage = getMetadataStorage();
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BuilderObject<TClass extends InstantiableClazz = any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any;
  [key: string]: ((value: unknown) => BuilderObject<TClass>) | (() => unknown);
  build: () => ClassInstance<TClass>;
}

function createClassBuilderObject<TClass extends InstantiableClazz>(classConstructor: TClass) {
  const metadataStorage = getMetadataStorage();
  const builderAccessors = metadataStorage.getBuilderAccessors(classConstructor);

  const builder: Partial<BuilderObject> = {
    build: function (this: BuilderObject<TClass>) {
      return this.instance;
    },
  };

  builderAccessors.sort((a, b) => {
    const aStartsWithUnderscore = a.propertyKey.toString().startsWith('_');
    const bStartsWithUnderscore = b.propertyKey.toString().startsWith('_');
    if (aStartsWithUnderscore && !bStartsWithUnderscore) return 1;
    if (!aStartsWithUnderscore && bStartsWithUnderscore) return -1;
    return 0;
  });

  builderAccessors.forEach((accessor) => {
    const propertyKey = accessor.propertyKey.toString();
    let builderPropertyKey = propertyKey;
    if (propertyKey.startsWith('_') && !(privateKeyToDesired(propertyKey) in builder)) {
      builderPropertyKey = privateKeyToDesired(propertyKey);
    }

    builder[builderPropertyKey] = function (this: BuilderObject<TClass>, ...args: unknown[]) {
      const value = args[0];
      if (0 === args.length) {
        return accessor.get(this.instance);
      }
      accessor.set(this.instance, value);
      return this;
    };
  });

  return Object.freeze(builder);
}

/**
 * Creates a builder for a class with required constructor parameters and optional properties.
 *
 * @param classConstructor - The class to build
 * @param parameters - Required constructor parameters
 * @returns A builder instance that provides fluent methods for setting optional properties
 *
 */
export function ParametrizedBuilder<TClass extends InstantiableClazz, TOptionals = ClassInstance<TClass>>(
  classConstructor: TClass,
  parameters: ConstructorParameters<TClass>,
): Builder<TOptionals, ClassInstance<TClass>> {
  const metadataStorage = getMetadataStorage();
  const instance: ClassInstance<TClass> = new classConstructor(...parameters);

  if (!metadataStorage.hasInitializedAccessors(classConstructor)) {
    setAccessorsForClassProperties(classConstructor, instance);
  }

  const builderObject =
    metadataStorage.getCachedBuilderObject(classConstructor) || createClassBuilderObject(classConstructor);
  metadataStorage.setCachedBuilderObject(classConstructor, builderObject);
  const builder = Object.setPrototypeOf({ instance: instance }, builderObject);

  return builder as Builder<TOptionals, ClassInstance<TClass>>;
}
