import { MetadataStorage } from '~lib/metadata-storage';
import { ClassMetadata, OptionalBuilderPropertyMetadata } from '~lib/types';

// Define the combined type at the top level
type StoredOptionalPropertyMetadata = ClassMetadata<OptionalBuilderPropertyMetadata>;

describe('MetadataStorage', () => {
  let storage: MetadataStorage;

  beforeEach(() => {
    storage = new MetadataStorage();
  });

  describe('addOptionalPropertyMetadata', () => {
    it('should store and retrieve metadata for a target class', () => {
      class TestClass {}

      const metadata: StoredOptionalPropertyMetadata = {
        target: TestClass,
        propertyKey: 'testProp',
        desiredPropertyKey: 'desiredProp',
      };

      storage.addOptionalPropertyMetadata(metadata);

      const result = storage.findOptionalPropertyMetadata(TestClass, 'testProp');
      expect(result).toEqual(metadata);
    });
  });

  describe('findOptionalPropertyMetadata', () => {
    it('should return undefined for non-existent metadata', () => {
      class TestClass {}

      const result = storage.findOptionalPropertyMetadata(TestClass, 'nonExistent');
      expect(result).toBeUndefined();
    });

    it('should handle inheritance by finding metadata in parent class', () => {
      class ParentClass {}
      class ChildClass extends ParentClass {}

      const metadata: StoredOptionalPropertyMetadata = {
        target: ParentClass,
        propertyKey: 'parentProp',
        desiredPropertyKey: 'desiredProp',
      };

      storage.addOptionalPropertyMetadata(metadata);

      const result = storage.findOptionalPropertyMetadata(ChildClass, 'parentProp');
      expect(result).toEqual(metadata);

      const childMetadata: StoredOptionalPropertyMetadata = {
        target: ChildClass,
        propertyKey: 'parentProp',
        desiredPropertyKey: 'overriddenProp',
      };

      storage.addOptionalPropertyMetadata(childMetadata);
      const overriddenResult = storage.findOptionalPropertyMetadata(ChildClass, 'parentProp');
      expect(overriddenResult).toEqual(childMetadata);
    });
  });

  describe('getOptionalProperties', () => {
    it('should return all properties including inherited ones', () => {
      class ParentClass {}
      class ChildClass extends ParentClass {}

      const parentMetadata: StoredOptionalPropertyMetadata = {
        target: ParentClass,
        propertyKey: 'parentProp',
        desiredPropertyKey: 'desiredProp1',
      };

      const childMetadata: StoredOptionalPropertyMetadata = {
        target: ChildClass,
        propertyKey: 'childProp',
        desiredPropertyKey: 'desiredProp2',
      };

      storage.addOptionalPropertyMetadata(parentMetadata);
      storage.addOptionalPropertyMetadata(childMetadata);

      const results = storage.getOptionalProperties(ChildClass);
      expect(results).toHaveLength(2);
      expect(results).toContainEqual(parentMetadata);
      expect(results).toContainEqual(childMetadata);
    });
  });

  describe('clear', () => {
    it('should remove all stored metadata', () => {
      class TestClass {}

      const metadata: StoredOptionalPropertyMetadata = {
        target: TestClass,
        propertyKey: 'testProp',
        desiredPropertyKey: 'desiredProp',
      };

      storage.addOptionalPropertyMetadata(metadata);
      storage.clear();

      const result = storage.findOptionalPropertyMetadata(TestClass, 'testProp');
      expect(result).toBeUndefined();
    });
  });
});
