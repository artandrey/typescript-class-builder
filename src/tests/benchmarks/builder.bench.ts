import { bench } from 'vitest';

import { UsingBuilderImplementationClass } from './classes/using-builder-implementation.class';
import { UsingBuilderSetters } from './classes/using-builder-setters.class';
import { UsingBuilder } from './classes/using-builder.class';
import { UsingConstructor } from './classes/using-constructor.class';

describe('class construction', () => {
  bench('builder to setters', () => {
    UsingBuilderSetters.builder()
      .optionalProperty1('value')
      .optionalProperty2('value')
      .optionalProperty3('value')
      .optionalProperty4('value')
      .optionalProperty5('value')
      .optionalProperty6('value')
      .optionalProperty7('value')
      .optionalProperty8('value')
      .optionalProperty9('value')
      .optionalProperty10('value')
      .optionalProperty11('value')
      .optionalProperty12('value')
      .optionalProperty13('value')
      .optionalProperty14('value')
      .optionalProperty15('value')
      .optionalProperty16('value')
      .optionalProperty17('value')
      .optionalProperty18('value')
      .optionalProperty19('value')
      .optionalProperty20('value')
      .build();
  });

  bench('builder to fields', () => {
    UsingBuilder.builder()
      .optionalProperty1('value')
      .optionalProperty2('value')
      .optionalProperty3('value')
      .optionalProperty4('value')
      .optionalProperty5('value')
      .optionalProperty6('value')
      .optionalProperty7('value')
      .optionalProperty8('value')
      .optionalProperty9('value')
      .optionalProperty10('value')
      .optionalProperty11('value')
      .optionalProperty12('value')
      .optionalProperty13('value')
      .optionalProperty14('value')
      .optionalProperty15('value')
      .optionalProperty16('value')
      .optionalProperty17('value')
      .optionalProperty18('value')
      .optionalProperty19('value')
      .optionalProperty20('value')
      .build();
  });

  bench('builder implementation', () => {
    UsingBuilderImplementationClass.builder()
      .optionalProperty1('value')
      .optionalProperty2('value')
      .optionalProperty3('value')
      .optionalProperty4('value')
      .optionalProperty5('value')
      .optionalProperty6('value')
      .optionalProperty7('value')
      .optionalProperty8('value')
      .optionalProperty9('value')
      .optionalProperty10('value')
      .optionalProperty11('value')
      .optionalProperty12('value')
      .optionalProperty13('value')
      .optionalProperty14('value')
      .optionalProperty15('value')
      .optionalProperty16('value')
      .optionalProperty17('value')
      .optionalProperty18('value')
      .optionalProperty19('value')
      .optionalProperty20('value')
      .build();
  });

  bench.skip('constructor', () => {
    new UsingConstructor(
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
      'value',
    );
  });
});
