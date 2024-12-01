import { ClassMetadata, Clazz, OptionalBuilderPropertyMetadata } from '../types';

export class MetadataStorage {
  private readonly _optionalBuilderPropertyMetadata: Map<Clazz, Map<PropertyKey, OptionalBuilderPropertyMetadata>> =
    new Map();
  private _ancestorsMap = new Map<Clazz, Clazz[]>();

  addOptionalPropertyMetadata(metadata: ClassMetadata<OptionalBuilderPropertyMetadata>): void {
    if (!this._optionalBuilderPropertyMetadata.has(metadata.target)) {
      this._optionalBuilderPropertyMetadata.set(
        metadata.target,
        new Map<PropertyKey, OptionalBuilderPropertyMetadata>(),
      );
    }
    this._optionalBuilderPropertyMetadata.get(metadata.target)!.set(metadata.propertyKey, metadata);
  }

  findOptionalPropertyMetadata(target: Clazz, propertyName: string): OptionalBuilderPropertyMetadata | undefined {
    return this.findMetadata(this._optionalBuilderPropertyMetadata, target, propertyName);
  }

  getOptionalProperties(target: Clazz): OptionalBuilderPropertyMetadata[] {
    return this.getMetadata(this._optionalBuilderPropertyMetadata, target);
  }

  clear(): void {
    this._optionalBuilderPropertyMetadata.clear();
    this._ancestorsMap.clear();
  }

  private getMetadata<T extends OptionalBuilderPropertyMetadata>(
    metadatas: Map<Clazz, Map<PropertyKey, T>>,
    target: Clazz,
  ): T[] {
    const metadataFromTargetMap = metadatas.get(target);
    let metadataFromTarget: T[] = [];
    if (metadataFromTargetMap) {
      metadataFromTarget = Array.from(metadataFromTargetMap.values());
    }

    const metadataFromAncestors: T[] = [];
    for (const ancestor of this.getAncestors(target)) {
      const ancestorMetadataMap = metadatas.get(ancestor);
      if (ancestorMetadataMap) {
        metadataFromAncestors.push(...Array.from(ancestorMetadataMap.values()));
      }
    }

    return metadataFromAncestors.concat(metadataFromTarget);
  }

  private findMetadata<T extends OptionalBuilderPropertyMetadata>(
    metadatas: Map<Clazz, Map<PropertyKey, T>>,
    target: Clazz,
    propertyKey: PropertyKey,
  ): T | undefined {
    const metadataFromTargetMap = metadatas.get(target);
    if (metadataFromTargetMap) {
      const metadataFromTarget = metadataFromTargetMap.get(propertyKey);
      if (metadataFromTarget) {
        return metadataFromTarget;
      }
    }

    for (const ancestor of this.getAncestors(target)) {
      const ancestorMetadataMap = metadatas.get(ancestor);
      if (ancestorMetadataMap) {
        const ancestorResult = ancestorMetadataMap.get(propertyKey);
        if (ancestorResult) {
          return ancestorResult;
        }
      }
    }

    return undefined;
  }

  private getAncestors(target: Clazz): Clazz[] {
    if (!target) return [];
    if (!this._ancestorsMap.has(target)) {
      const ancestors: Clazz[] = [];
      for (
        let baseClass = Object.getPrototypeOf(target.prototype?.constructor);
        typeof baseClass?.prototype !== 'undefined';
        baseClass = Object.getPrototypeOf(baseClass.prototype?.constructor)
      ) {
        ancestors.push(baseClass);
      }
      this._ancestorsMap.set(target, ancestors);
    }
    return this._ancestorsMap.get(target) ?? [];
  }
}
