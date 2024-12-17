import { Builder, ParametrizedBuilder, toBuilderMethod } from '~lib/index';

interface MyClassOptionals {
  optionalProperty?: string;
}

class MyClass {
  private _optionalProperty?: string;
  private _requiredProperty: string;
  public publicOptionalProperty?: string;

  constructor(requiredProperty: string) {
    this._requiredProperty = requiredProperty;
  }

  public static withOptionalsBuilder = toBuilderMethod(MyClass).withOptionals<MyClassOptionals>();
  public static classAsOptionalsBuilder = toBuilderMethod(MyClass).classAsOptionals();
}

test('should require constructor parameters', () => {
  // @ts-expect-error - should require constructor parameters
  assertType(ParametrizedBuilder(MyClass, []));
  // @ts-expect-error - should require constructor parameters
  assertType(MyClass.withOptionalsBuilder());
});

test('should not accept correct constructor parameters', () => {
  // @ts-expect-error - passed number instead of string
  assertType(ParametrizedBuilder(MyClass, [1]));
  // @ts-expect-error - passed number instead of string
  assertType(MyClass.withOptionalsBuilder(1));
  // @ts-expect-error - passed number instead of string
  assertType(MyClass.classAsOptionalsBuilder(1));
});

test('should accept correct constructor parameters', () => {
  assertType(ParametrizedBuilder(MyClass, ['requiredProperty']));
  assertType(MyClass.withOptionalsBuilder('requiredProperty'));
  assertType(MyClass.classAsOptionalsBuilder('requiredProperty'));
});

test('should not accept more parameters than required', () => {
  // @ts-expect-error - passed more parameters than required
  assertType(ParametrizedBuilder(MyClass, ['optionalProperty', 'extraProperty']));
  // @ts-expect-error - passed more parameters than required
  assertType(MyClass.withOptionalsBuilder('requiredProperty', 'extraProperty'));
  // @ts-expect-error - passed more parameters than required
  assertType(MyClass.classAsOptionalsBuilder('requiredProperty', 'extraProperty'));
});

test('should return instance of class', () => {
  expectTypeOf(ParametrizedBuilder(MyClass, ['requiredProperty']).build()).toEqualTypeOf<MyClass>();
  expectTypeOf(MyClass.withOptionalsBuilder('requiredProperty').build()).toEqualTypeOf<MyClass>();
  expectTypeOf(MyClass.classAsOptionalsBuilder('requiredProperty').build()).toEqualTypeOf<MyClass>();
});

test('builder should contain property getter and setter', () => {
  expectTypeOf(MyClass.withOptionalsBuilder('requiredProperty').optionalProperty).toEqualTypeOf<
    ((arg: string | undefined) => Builder<MyClassOptionals, MyClass>) & (() => string | undefined)
  >();
});

test('builder should contain property setter', () => {
  expectTypeOf(MyClass.withOptionalsBuilder('requiredProperty').optionalProperty('new value')).toEqualTypeOf<
    Builder<MyClassOptionals, MyClass>
  >();
});

test('builder should contain property getter', () => {
  expectTypeOf(MyClass.withOptionalsBuilder('requiredProperty').optionalProperty()).toEqualTypeOf<string | undefined>();
});

test('setter should accept correct value', () => {
  // @ts-expect-error - passed number instead of string
  assertType(MyClass.withOptionalsBuilder('requiredProperty').optionalProperty(1));
});

test('class as optionals should contain public properties', () => {
  expectTypeOf(MyClass.classAsOptionalsBuilder('requiredProperty').publicOptionalProperty).toEqualTypeOf<
    ((arg: string | undefined) => Builder<MyClass, MyClass>) & (() => string | undefined)
  >();
});
