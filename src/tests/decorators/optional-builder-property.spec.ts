import { OptionalBuilderProperty } from '~lib/decorators';

describe('OptionalBuilderProperty', () => {
  it('should not be able to decorate symbol property', () => {
    // @ts-expect-error - symbol is not a string
    expect(() => OptionalBuilderProperty()(Object, Symbol('test'))).toThrow();
  });
});
