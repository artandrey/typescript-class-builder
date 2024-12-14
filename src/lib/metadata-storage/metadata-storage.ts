import { Clazz } from '../types';
import { BuilderAccessorsMetadata } from './types/builder-accessors-metadata';
import { ClassPropertyMetadata } from './types/class-metadata';

export class MetadataStorage {
  private readonly _builderAccessorsMetadata: Map<
    Clazz,
    Map<PropertyKey, ClassPropertyMetadata<BuilderAccessorsMetadata>>
  > = new Map();
  private _ancestorsMap = new Map<Clazz, Clazz[]>();
  private readonly _initializedAccessorsClasses = new Set<Clazz>();

  addBuilderAccessorsMetadata(metadata: ClassPropertyMetadata<BuilderAccessorsMetadata>): void {
    if (!this._builderAccessorsMetadata.has(metadata.target)) {
      this._builderAccessorsMetadata.set(
        metadata.target,
        new Map<PropertyKey, ClassPropertyMetadata<BuilderAccessorsMetadata>>(),
      );
    }
    this._builderAccessorsMetadata.get(metadata.target)!.set(metadata.propertyKey, metadata);
  }

  findBuilderAccessorsMetadata(
    target: Clazz,
    propertyName: string,
  ): ClassPropertyMetadata<BuilderAccessorsMetadata> | undefined {
    return this.findMetadata(this._builderAccessorsMetadata, target, propertyName);
  }

  getBuilderAccessors(target: Clazz): ClassPropertyMetadata<BuilderAccessorsMetadata>[] {
    return this.getMetadata(this._builderAccessorsMetadata, target);
  }

  clear(): void {
    this._ancestorsMap.clear();
    this._builderAccessorsMetadata.clear();
    this._initializedAccessorsClasses.clear();
  }

  private getMetadata<T>(
    metadataMap: Map<Clazz, Map<PropertyKey, ClassPropertyMetadata<T>>>,
    target: Clazz,
  ): ClassPropertyMetadata<T>[] {
    const metadataFromTargetMap = metadataMap.get(target);
    let metadataFromTarget: ClassPropertyMetadata<T>[] = [];
    if (metadataFromTargetMap) {
      metadataFromTarget = Array.from(metadataFromTargetMap.values());
    }

    const metadataFromAncestors: ClassPropertyMetadata<T>[] = [];
    for (const ancestor of this.getAncestors(target) ?? []) {
      const ancestorMetadataMap = metadataMap.get(ancestor);
      if (ancestorMetadataMap) {
        metadataFromAncestors.push(...Array.from(ancestorMetadataMap.values()));
      }
    }

    return metadataFromAncestors.concat(metadataFromTarget);
  }

  private findMetadata<T>(
    metadataMap: Map<Clazz, Map<PropertyKey, ClassPropertyMetadata<T>>>,
    target: Clazz,
    propertyKey: PropertyKey,
  ): ClassPropertyMetadata<T> | undefined {
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

  addInitializedAccessorsClass(clazz: Clazz): void {
    this._initializedAccessorsClasses.add(clazz);
  }

  hasInitializedAccessors(clazz: Clazz): boolean {
    return this._initializedAccessorsClasses.has(clazz);
  }
}
