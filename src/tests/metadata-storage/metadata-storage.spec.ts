import { MetadataStorage } from '~lib/metadata-storage';
import { BuilderAccessorsMetadata, ClassPropertyMetadata } from '~lib/metadata-storage/types';

type StoredBuilderAccessorsMetadata = ClassPropertyMetadata<BuilderAccessorsMetadata>;

describe('MetadataStorage', () => {
  let storage: MetadataStorage;

  beforeEach(() => {
    storage = new MetadataStorage();
  });

  describe('addBuilderAccessorsMetadata', () => {
    it('should store and retrieve metadata for a target class', () => {
      class TestClass {}

      const metadata: StoredBuilderAccessorsMetadata = {
        target: TestClass,
        propertyKey: 'testProp',
        get: () => {},
        set: () => {},
      };

      storage.addBuilderAccessorsMetadata(metadata);

      const result = storage.findBuilderAccessorsMetadata(TestClass, 'testProp');
      expect(result).toEqual(metadata);
    });
  });

  describe('findBuilderAccessorsMetadata', () => {
    it('should return undefined for non-existent metadata', () => {
      class TestClass {}

      const result = storage.findBuilderAccessorsMetadata(TestClass, 'nonExistent');
      expect(result).toBeUndefined();
    });

    it('should handle inheritance by finding metadata in parent class', () => {
      class ParentClass {}
      class ChildClass extends ParentClass {}

      const metadata: StoredBuilderAccessorsMetadata = {
        target: ParentClass,
        propertyKey: 'parentProp',
        get: () => {},
        set: () => {},
      };

      storage.addBuilderAccessorsMetadata(metadata);

      const result = storage.findBuilderAccessorsMetadata(ChildClass, 'parentProp');
      expect(result).toEqual(metadata);

      const childMetadata: StoredBuilderAccessorsMetadata = {
        target: ChildClass,
        propertyKey: 'parentProp',
        get: () => {},
        set: () => {},
      };

      storage.addBuilderAccessorsMetadata(childMetadata);
      const overriddenResult = storage.findBuilderAccessorsMetadata(ChildClass, 'parentProp');
      expect(overriddenResult).toEqual(childMetadata);
    });
  });

  describe('getBuilderAccessors', () => {
    it('should return all properties including inherited ones', () => {
      class ParentClass {}
      class ChildClass extends ParentClass {}

      const parentMetadata: StoredBuilderAccessorsMetadata = {
        target: ParentClass,
        propertyKey: 'parentProp',
        get: () => {},
        set: () => {},
      };

      const childMetadata: StoredBuilderAccessorsMetadata = {
        target: ChildClass,
        propertyKey: 'childProp',
        get: () => {},
        set: () => {},
      };

      storage.addBuilderAccessorsMetadata(parentMetadata);
      storage.addBuilderAccessorsMetadata(childMetadata);

      const results = storage.getBuilderAccessors(ChildClass);
      expect(results).toHaveLength(2);
      expect(results).toContainEqual(parentMetadata);
      expect(results).toContainEqual(childMetadata);
    });
  });

  describe('clear', () => {
    it('should remove all stored metadata', () => {
      class TestClass {}

      const metadata: StoredBuilderAccessorsMetadata = {
        target: TestClass,
        propertyKey: 'testProp',
        get: () => {},
        set: () => {},
      };

      storage.addBuilderAccessorsMetadata(metadata);
      storage.clear();

      const result = storage.findBuilderAccessorsMetadata(TestClass, 'testProp');
      expect(result).toBeUndefined();
    });
  });

  describe('initialized accessors tracking', () => {
    it('should track initialized accessors classes', () => {
      class TestClass {}

      expect(storage.hasInitializedAccessors(TestClass)).toBeFalsy();

      storage.addInitializedAccessorsClass(TestClass);

      expect(storage.hasInitializedAccessors(TestClass)).toBeTruthy();
    });

    it('should clear initialized accessors classes when clearing storage', () => {
      class TestClass {}

      storage.addInitializedAccessorsClass(TestClass);
      storage.clear();

      expect(storage.hasInitializedAccessors(TestClass)).toBeFalsy();
    });
  });
});
