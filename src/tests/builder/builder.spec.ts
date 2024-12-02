import { OptionalBuilderProperty, ParametrizedBuilder } from '~lib/index';

export interface WithOptionalProperty {
  optionalProperty?: string;
}

export interface WithTransformedProperty {
  _OPTIONALPROPERTY?: string;
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
      @OptionalBuilderProperty()
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

  it('should transform property keys', () => {
    class MyClass {
      @OptionalBuilderProperty({ transformKey: (key) => key.toUpperCase() })
      private _optionalProperty?: string;
    }

    const result = ParametrizedBuilder<typeof MyClass, WithTransformedProperty>(MyClass, [])
      ._OPTIONALPROPERTY('optional property value')
      .build();

    expect(result).toEqual({
      _optionalProperty: 'optional property value',
    });
  });

  it('should override default values', () => {
    class MyClass {
      @OptionalBuilderProperty()
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
});
