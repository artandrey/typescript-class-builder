# Api definition

Inspired by [builder-pattern](https://www.npmjs.com/package/builder-pattern) npm package.

```typescript
import { OptionalBuilderProperty, createBuilderMethodFactory } from 'lib';

interface MyClassOptionals {
  optionalProperty: string;
}

// assume that there are more than 2 fields, so builder pattern is applicable here
class MyClass {
  private _requiredProperty: string;
  @OptionalBuilderProperty() // will remove _ prefix by default
  // or with custom transformation
  @OptionalBuilderProperty({
    transformKey: (value: string) => value.slice(1), // remove first _ character
  })
  private _optionalProperty: string;

  constructor(requiredProperty: string) {
    this._requiredProperty = requiredProperty;
  }

  public static builder = createBuilderMethodFactory<MyClassOptionals>()(MyClass);

  get requiredProperty(): string {
    return this._requiredProperty;
  }

  get optionalProperty(): string {
    return this._optionalProperty;
  }
}

MyClass.builder('required property value').optionalProperty('optional property value').build();
// ^ class MyClass { requiredProperty: 'required property value', optionalProperty: 'optional property value' }
```
