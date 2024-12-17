import { bench } from 'vitest';

import { UsingBuilderImplementationClass } from './classes/using-builder-implementation.class';
import { UsingBuilderSetters } from './classes/using-builder-setters.class';
import { UsingBuilder } from './classes/using-builder.class';

describe.each([
  {
    name: 'builder to setters',
    class: UsingBuilderSetters,
  },
  {
    name: 'builder to fields',
    class: UsingBuilder,
  },
  {
    name: 'builder implementation',
    class: UsingBuilderImplementationClass,
  },
])('class construction', (test) => {
  bench(
    test.name,
    () => {
      const builder = test.class.builder();
      builder.optionalProperty1('value');
      builder.optionalProperty2('value');
      builder.optionalProperty3('value');
      builder.optionalProperty4('value');
      builder.optionalProperty5('value');
      builder.optionalProperty6('value');
      builder.optionalProperty7('value');
      builder.optionalProperty8('value');
      builder.optionalProperty9('value');
      builder.optionalProperty10('value');
      builder.optionalProperty11('value');
      builder.optionalProperty12('value');
      builder.optionalProperty13('value');
      builder.optionalProperty14('value');
      builder.optionalProperty15('value');
      builder.optionalProperty16('value');
      builder.optionalProperty17('value');
      builder.optionalProperty18('value');
      builder.optionalProperty19('value');
      builder.optionalProperty20('value');
      builder.build();
    },
    {
      setup: () => {
        test.class.builder();
      },
    },
  );
});

describe('builder creation', () => {
  bench('parametrized builder', () => {
    UsingBuilder.builder();
  });
});
