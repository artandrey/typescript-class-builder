import { ClassMetadata, Clazz, OptionalBuilderPropertyMetadata } from '../types';

export class MetadataStorage {
  private readonly _optionalBuilderPropertyMetadata: Map<
    Clazz,
    Map<PropertyKey, ClassMetadata<OptionalBuilderPropertyMetadata>>
  > = new Map();
  private _ancestorsMap = new Map<Clazz, Clazz[]>();

  addOptionalPropertyMetadata(metadata: ClassMetadata<OptionalBuilderPropertyMetadata>): void {
    if (!this._optionalBuilderPropertyMetadata.has(metadata.target)) {
      this._optionalBuilderPropertyMetadata.set(
        metadata.target,
        new Map<PropertyKey, ClassMetadata<OptionalBuilderPropertyMetadata>>(),
      );
    }
    this._optionalBuilderPropertyMetadata.get(metadata.target)!.set(metadata.propertyKey, metadata);
  }

  findOptionalPropertyMetadata(
    target: Clazz,
    propertyName: string,
  ): ClassMetadata<OptionalBuilderPropertyMetadata> | undefined {
    return this.findMetadata(this._optionalBuilderPropertyMetadata, target, propertyName);
  }

  getOptionalProperties(target: Clazz): ClassMetadata<OptionalBuilderPropertyMetadata>[] {
    return this.getMetadata(this._optionalBuilderPropertyMetadata, target);
  }

  clear(): void {
    this._optionalBuilderPropertyMetadata.clear();
    this._ancestorsMap.clear();
  }

  private getMetadata<T extends OptionalBuilderPropertyMetadata>(
    metadataMap: Map<Clazz, Map<PropertyKey, ClassMetadata<T>>>,
    target: Clazz,
  ): ClassMetadata<T>[] {
    const metadataFromTargetMap = metadataMap.get(target);
    let metadataFromTarget: ClassMetadata<T>[] = [];
    if (metadataFromTargetMap) {
      metadataFromTarget = Array.from(metadataFromTargetMap.values());
    }

    const metadataFromAncestors: ClassMetadata<T>[] = [];
    for (const ancestor of this.getAncestors(target) ?? []) {
      const ancestorMetadataMap = metadataMap.get(ancestor);
      if (ancestorMetadataMap) {
        metadataFromAncestors.push(...Array.from(ancestorMetadataMap.values()));
      }
    }

    return metadataFromAncestors.concat(metadataFromTarget);
  }

  private findMetadata<T extends OptionalBuilderPropertyMetadata>(
    metadataMap: Map<Clazz, Map<PropertyKey, ClassMetadata<T>>>,
    target: Clazz,
    propertyKey: PropertyKey,
  ): ClassMetadata<T> | undefined {
    const metadataFromTargetMap = metadataMap.get(target);
    if (metadataFromTargetMap) {
      const metadataFromTarget = metadataFromTargetMap.get(propertyKey);
      if (metadataFromTarget) {
        return metadataFromTarget;
      }
    }

    for (const ancestor of this.getAncestors(target) ?? []) {
      const ancestorMetadataMap = metadataMap.get(ancestor);
      if (ancestorMetadataMap) {
        const ancestorResult = ancestorMetadataMap.get(propertyKey);
        if (ancestorResult) {
          return ancestorResult;
        }
      }
    }

    return undefined;
  }

  private getAncestors(target: Clazz): Clazz[] | undefined {
    if (!target) return [];
    if (!this._ancestorsMap.has(target)) {
      const ancestors: Clazz[] = [];

      for (
        let baseClass = target.prototype?.constructor
          ? Object.getPrototypeOf(target.prototype?.constructor)
          : undefined;
        typeof baseClass?.prototype !== 'undefined';
        baseClass = Object.getPrototypeOf(baseClass.prototype?.constructor)
      ) {
        ancestors.push(baseClass);
      }
      this._ancestorsMap.set(target, ancestors);
    }
    return this._ancestorsMap.get(target);
  }
}
