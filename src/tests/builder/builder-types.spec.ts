import { IBuilder, OptionalBuilderProperty, ParametrizedBuilder, createBuilderMethodFactory } from '~lib/index';

interface MyClassOptionals {
  optionalProperty?: string;
}

class MyClass {
  @OptionalBuilderProperty()
  private _optionalProperty?: string;

  private _requiredProperty: string;

  constructor(requiredProperty: string) {
    this._requiredProperty = requiredProperty;
  }

  public static builder = createBuilderMethodFactory<MyClassOptionals>()(MyClass);
}

test('should require constructor parameters', () => {
  // @ts-expect-error - should require constructor parameters
  assertType(ParametrizedBuilder(MyClass, []));
  // @ts-expect-error - should require constructor parameters
  assertType(MyClass.builder());
});

test('should not accept correct constructor parameters', () => {
  // @ts-expect-error - passed number instead of string
  assertType(ParametrizedBuilder(MyClass, [1]));
  // @ts-expect-error - passed number instead of string
  assertType(MyClass.builder(1));
});

test('should accept correct constructor parameters', () => {
  assertType(ParametrizedBuilder(MyClass, ['requiredProperty']));
  assertType(MyClass.builder('requiredProperty'));
});

test('should not accept more parameters than required', () => {
  // @ts-expect-error - passed more parameters than required
  assertType(ParametrizedBuilder(MyClass, ['optionalProperty', 'extraProperty']));
  // @ts-expect-error - passed more parameters than required
  assertType(MyClass.builder('requiredProperty', 'extraProperty'));
});

test('should return instance of class', () => {
  expectTypeOf(ParametrizedBuilder(MyClass, ['requiredProperty']).build()).toEqualTypeOf<MyClass>();
});

test('builder should contain property getter and setter', () => {
  expectTypeOf(MyClass.builder('requiredProperty').optionalProperty).toEqualTypeOf<
    ((arg: string | undefined) => IBuilder<MyClassOptionals, MyClass>) & (() => string | undefined)
  >();
});

test('builder should contain property setter', () => {
  expectTypeOf(MyClass.builder('requiredProperty').optionalProperty('new value')).toEqualTypeOf<
    IBuilder<MyClassOptionals, MyClass>
  >();
});

test('builder should contain property getter', () => {
  expectTypeOf(MyClass.builder('requiredProperty').optionalProperty()).toEqualTypeOf<string | undefined>();
});

test('setter should accept correct value', () => {
  // @ts-expect-error - passed number instead of string
  assertType(MyClass.builder('requiredProperty').optionalProperty(1));
});
