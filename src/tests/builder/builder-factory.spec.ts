import { OptionalBuilderProperty, toBuilderMethod } from '~lib/index';

interface MyClassOptionals {
  optionalProperty?: string;
}

describe('Builder factory', () => {
  it('should create builder with class as optionals', () => {
    class MyClass {
      private _requiredProperty: string;

      constructor(requiredProperty: string) {
        this._requiredProperty = requiredProperty;
      }

      get requiredProperty(): string {
        return this._requiredProperty;
      }

      public static builder = toBuilderMethod(MyClass).classAsOptionals();
    }

    const result = MyClass.builder('requiredProperty').build();

    expect(result).toEqual({ _requiredProperty: 'requiredProperty' });
  });

  it('should create builder with optionals', () => {
    class MyClass {
      private _requiredProperty: string;
      @OptionalBuilderProperty()
      private _optionalProperty?: string;

      constructor(requiredProperty: string) {
        this._requiredProperty = requiredProperty;
      }

      get requiredProperty(): string {
        return this._requiredProperty;
      }

      get optionalProperty(): string | undefined {
        return this._optionalProperty;
      }

      public static builder = toBuilderMethod(MyClass).withOptionals<MyClassOptionals>();
    }

    const result = MyClass.builder('requiredProperty').optionalProperty('optionalProperty').build();

    expect(result).toEqual({
      _requiredProperty: 'requiredProperty',
      _optionalProperty: 'optionalProperty',
    });
  });

  it('should pass properties to constructor', () => {
    class MyClass {
      private _requiredProperty: string;
      @OptionalBuilderProperty()
      private _optionalProperty?: string;

      constructor(requiredProperty: string) {
        this._requiredProperty = requiredProperty;
      }

      get requiredProperty(): string {
        return this._requiredProperty;
      }

      get optionalProperty(): string | undefined {
        return this._optionalProperty;
      }

      public static builder = toBuilderMethod(MyClass).withOptionals<MyClassOptionals>();
    }

    const result = MyClass.builder('requiredProperty').optionalProperty('optionalProperty').build();

    expect(result).toEqual({
      _requiredProperty: 'requiredProperty',
      _optionalProperty: 'optionalProperty',
    });
  });
});
