import { getClassPlainProperties } from '../../lib/util/get-class-plain-properties';

describe('getClassPlainProperties', () => {
  class TestClass {
    public plainProp1 = 'value1';
    public plainProp2 = 42;
    private plainProp3 = true;

    get computedProp() {
      return 'computed';
    }

    set settableProp(value: string) {
      this.plainProp1 = value;
    }
  }

  class GetterOnlyClass {
    get prop1() {
      return 'value1';
    }

    get prop2() {
      return 42;
    }
  }

  class BaseClass {
    public baseProp = 'base';
  }

  class DerivedClass extends BaseClass {
    public derivedProp = 'derived';
  }

  describe('when class has mixed properties', () => {
    let plainProperties: Set<string>;

    beforeEach(() => {
      plainProperties = getClassPlainProperties(new TestClass());
    });

    it('should return a Set instance with three properties', () => {
      expect(plainProperties).toBeInstanceOf(Set);
      expect(plainProperties.size).toBe(3);
    });

    it('should include all plain properties', () => {
      expect(plainProperties.has('plainProp1')).toBe(true);
      expect(plainProperties.has('plainProp2')).toBe(true);
      expect(plainProperties.has('plainProp3')).toBe(true);
    });

    it('should exclude accessor properties', () => {
      expect(plainProperties.has('computedProp')).toBe(false);
      expect(plainProperties.has('settableProp')).toBe(false);
    });
  });

  describe('when class has only getters', () => {
    let plainProperties: Set<string>;

    beforeEach(() => {
      plainProperties = getClassPlainProperties(new GetterOnlyClass());
    });

    it('should return an empty Set instance', () => {
      expect(plainProperties.size).toBe(0);
    });
  });

  describe('when class inherits properties', () => {
    let plainProperties: Set<string>;

    beforeEach(() => {
      plainProperties = getClassPlainProperties(new DerivedClass());
    });

    it('should include both base and derived properties', () => {
      expect(plainProperties.size).toBe(2);
      expect(plainProperties.has('baseProp')).toBe(true);
      expect(plainProperties.has('derivedProp')).toBe(true);
    });
  });
});
