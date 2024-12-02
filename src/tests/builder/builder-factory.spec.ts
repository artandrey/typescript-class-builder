import { createBuilderMethodFactory } from '~lib/create-builder-method-factory';
import { OptionalBuilderProperty } from '~lib/index';

interface MyClassOptionals {
  optionalProperty?: string;
}

describe('Builder factory', () => {
  it('should create builder', () => {
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

      public static builder = createBuilderMethodFactory<MyClassOptionals>()(MyClass);
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

      public static builder = createBuilderMethodFactory<MyClassOptionals>()(MyClass);
    }

    const result = MyClass.builder('requiredProperty').optionalProperty('optionalProperty').build();

    expect(result).toEqual({
      _requiredProperty: 'requiredProperty',
      _optionalProperty: 'optionalProperty',
    });
  });
});
