import { BuilderAccessors, ParametrizedBuilder } from '~lib/index';

export interface WithOptionalProperty {
  optionalProperty?: string;
}

export interface WithTransformedProperty {
  _optionalPropertyTransformed?: string;
}

describe('builder', () => {
  it('should return instance of class', () => {
    class MyClass {}

    const result = ParametrizedBuilder(MyClass, []).build();

    expect(result).toBeInstanceOf(MyClass);
  });

  it('should call constructor with required parameters', () => {
    class MyClass {
      private _transformedProperty: string;

      constructor(public requiredProperty: string) {
        this._transformedProperty = requiredProperty.toUpperCase();
      }

      get transformedProperty() {
        return this._transformedProperty;
      }
    }

    const result = ParametrizedBuilder(MyClass, ['required property value']).build();

    expect(result.transformedProperty).toBe('REQUIRED PROPERTY VALUE');
  });

  it('should pass required parameters to constructor', () => {
    class MyClass {
      constructor(public requiredProperty: string) {}
    }

    const result = ParametrizedBuilder(MyClass, ['required property value']).build();

    expect(result).toEqual({ requiredProperty: 'required property value' });
  });

  it('should add optional properties', () => {
    class MyClass {
      public optionalProperty?: string;

      constructor(public requiredProperty: string) {}
    }

    const result = ParametrizedBuilder(MyClass, ['required property value'])
      .optionalProperty('optional property value')
      .build();

    expect(result).toEqual({
      requiredProperty: 'required property value',
      optionalProperty: 'optional property value',
    });
  });

  it('should add optional private properties', () => {
    class MyClass {
      private _optionalProperty?: string;
      private _requiredProperty: string;

      constructor(requiredProperty: string) {
        this._requiredProperty = requiredProperty;
      }

      get optionalProperty() {
        return this._optionalProperty;
      }

      get requiredProperty() {
        return this._requiredProperty;
      }
    }

    const result = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, ['required property value'])
      .optionalProperty('optional property value')
      .build();

    expect(result).toEqual({
      _requiredProperty: 'required property value',
      _optionalProperty: 'optional property value',
    });
  });

  it('should override default values', () => {
    class MyClass {
      private _optionalProperty?: string = 'default value';
    }

    const notOverridden = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []).build();

    expect(notOverridden).toEqual({ _optionalProperty: 'default value' });

    const overridden = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, [])
      .optionalProperty('overridden value')
      .build();

    expect(overridden).toEqual({ _optionalProperty: 'overridden value' });

    const overriddenWithUndefined = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, [])
      .optionalProperty(undefined)
      .build();

    expect(overriddenWithUndefined).toEqual({ _optionalProperty: undefined });
  });

  it('getter should return current value', () => {
    class MyClass {
      private _optionalProperty?: string;
    }

    const builder = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []);

    expect(builder.optionalProperty()).toBeUndefined();

    builder.optionalProperty('value');

    expect(builder.optionalProperty()).toBe('value');
  });

  it('should throw error if property is not found', () => {
    class MyClass {}

    expect(() => ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []).optionalProperty()).toThrow();
  });

  it('should not set through getter', () => {
    class MyClass {
      private _optionalProperty?: string;

      get optionalProperty() {
        return this._optionalProperty;
      }
    }

    const builder = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []);
    expect(builder.optionalProperty('value').build()).toEqual({ _optionalProperty: 'value' });
  });

  it('should not set through setter', () => {
    class MyClass {
      private _optionalProperty?: string;

      set optionalProperty(value: string) {
        this._optionalProperty = value;
      }
    }

    const builder = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []);
    expect(builder.optionalProperty('value').build()).toEqual({ _optionalProperty: 'value' });
  });

  it('should set through specified setter', () => {
    class MyClass {
      public setterCalled = false;
      @BuilderAccessors((target) => target._optionalProperty, (target, value) => (target.optionalProperty = value))
      private _optionalProperty?: string;

      set optionalProperty(value: string | undefined) {
        this.setterCalled = true;
        this._optionalProperty = value;
      }
    }

    const builder = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []);
    const result = builder.optionalProperty('value').build();
    expect(result.setterCalled).toBe(true);
  });

  it('should get properties through getter', () => {
    class MyClass {
      @BuilderAccessors((target) => target.optionalProperty, (target, value) => (target._optionalProperty = value))
      private _optionalProperty?: string;

      get optionalProperty() {
        return 'getter_' + this._optionalProperty;
      }
    }

    const builder = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, []);
    builder.optionalProperty('value');
    expect(builder.optionalProperty()).toBe('getter_value');
  });

  it('should prioritize exact property name over underscored (private)', () => {
    class MyClass {
      public _optionalProperty?: string;
      public optionalProperty?: string;
    }

    const instance = ParametrizedBuilder<typeof MyClass, WithOptionalProperty>(MyClass, [])
      .optionalProperty('value')
      .build();
    expect(instance.optionalProperty).toBe('value');
    expect(instance._optionalProperty).toBeUndefined();
  });
});
