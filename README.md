# Introduction

This library is designed to help you build classes with optional properties using the builder pattern.

## Navigation

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Builder pattern](#builder-pattern)
- [This library](#this-library)
  - [Basic usage](#basic-usage)
  - [Default values](#default-values)
  - [Private properties](#private-properties)
  - [Property accessors](#property-accessors)

# Installation

```bash
npm install class-constructor
```

or

```bash
yarn add class-constructor
```

or

```bash
pnpm add class-constructor
```

**Important!**

Make following changes in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    // set useDefineForClassFields to true for correct class fields initialization
    // this option will set undefined to uninitialized fields that will allow builder to track them
    "useDefineForClassFields": true
  }
}
```

# Compatibility

Latest version of the package uses objects instead of ES6 Proxy.
It not only significantly improved performance, but also made the library compatible with older environments (just make sure you have `useDefineForClassFields` set to `true` in your `tsconfig.json`).

# Builder pattern

Builder pattern is a design pattern that allows you to build complex objects step by step.
Example:

```typescript
// for example, we have a Button class
// it has a required property 'text' and optional properties 'color' and 'size' and 10 more ...
// if all those properties would be accepted through constructor, it would be a mess
// we should have remember an order of arguments, and it would be hard to read and maintain
new Button('Click me', undefined, undefined, 'red');

// instead, we can use builder pattern
// it allows us to build an object step by step
Button.builder('Click me').withColor('red').build();
```

But, the builder pattern is not easy to implement, and it requires a lot of boilerplate code.

# This library

`class-constructor` library allows you to create builders with just few lines of code.

## Basic usage

```typescript
import { toBuilderMethod } from 'class-constructor';

class Button {
  public text: string;

  public color?: string;

  public size?: string;

  constructor(text: string) {
    this.text = text;
  }

  public static builder = toBuilderMethod(Button).classAsOptionals();
}

// and here we go
const buttonBuilder = Button.builder('Click me');
buttonBuilder.color('red');
console.log(buttonBuilder.color()); // 'red'
buttonBuilder.build();
// ^ class Button { text: 'Click me', color: 'red', size: undefined }
```

## Default values

You can set default values for optional properties:

```typescript
class Button {
  public text: string;

  public color?: string = 'red';

  public size?: string = 'small';

  constructor(text: string) {
    this.text = text;
  }

  public static builder = toBuilderMethod(Button).classAsOptionals();
}

Button.builder('Click me').color('blue').build();
// ^ class Button { text: 'Click me', color: 'blue', size: 'small' }
```

## Private properties

If you have private properties in your class, you still can build class with them.
But to do so, you will need to create an interface to let TypeScript know about them.

```typescript
interface ButtonOptionals {
  color?: string; // note that we don't have _ prefix here
  size?: string;
}

class Button {
  private _text: string;
  // we prefix private properties with "_" even if builder option interface doesn't have them
  // class builder will find them and be able to set them
  private _color?: string = 'red';
  private _size?: string = 'small';

  constructor(text: string) {
    this._text = text;
  }

  public static builder = toBuilderMethod(Button).withOptionals<ButtonOptionals>();

  // ... getters and setters ...
}

Button.builder('Click me').color('blue').build();
// ^ class Button { _text: 'Click me', _color: 'blue', _size: 'small' }
```

## Property accessors

### Accessor priority

```typescript
interface WithPrivateAndPublicPropertyOptionals {
  name: string;
}

class WithPrivateAndPublicProperty {
  private _name?: string;

  // property with full match will be preferred over private property
  public name?: string;

  static builder = toBuilderMethod(WithPrivateAndPublicProperty).withOptionals<WithPrivateAndPublicPropertyOptionals>();
}

WithPrivateAndPublicProperty.builder().name('Jake').build();
// ^ class WithPrivateAndPublicProperty { _name: undefined, name: 'Jake' }
```

### Getters and setters

Getters and setters will be ignored by default.

```typescript
class WithGetterAndSetter {
  private _name?: string;

  public get name() {
    console.log('getter');
    return this._name;
  }

  public set name(value: string) {
    console.log('setter', value);
    this._name = value;
  }

  public static builder = toBuilderMethod(WithGetterAndSetter).classAsOptionals();
}

const builder = WithGetterAndSetter.builder();
builder.name('Jake');
// no console.log called

console.log(builder.name()); // 'Jake'
// no console.log called

builder.build();
// ^ class WithGetterAndSetter { _name: 'Jake' }
```

To enable getters and setters, you can use `BuilderAccessors` decorator.

```typescript
class WithGetterAndSetter {
  @BuilderAccessors((target) => target.name, (target, value) => (target._name = value))
  private _name?: string;

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    console.log('setter', value);
    this._name = value;
  }

  public static builder = toBuilderMethod(WithGetterAndSetter).classAsOptionals();
}

const builder = WithGetterAndSetter.builder();
builder.name('Jake');
// console.log called: > setter

console.log(builder.name()); // 'Jake'
// console.log called: > getter

builder.build();
// ^ class WithGetterAndSetter { _name: 'Jake' }
```
