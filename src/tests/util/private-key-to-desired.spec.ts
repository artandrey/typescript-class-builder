import { privateKeyToDesired } from '../../lib/util/private-key-to-desired';

describe('privateKeyToDesired', () => {
  it('should remove leading underscore from private keys', () => {
    expect(privateKeyToDesired('_privateProperty')).toBe('privateProperty');
    expect(privateKeyToDesired('_name')).toBe('name');
    expect(privateKeyToDesired('_123')).toBe('123');
  });

  it('should return the same key if key does not start with underscore', () => {
    expect(privateKeyToDesired('publicProperty')).toBe('publicProperty');
    expect(privateKeyToDesired('property_with_underscore')).toBe('property_with_underscore');
  });

  it('should handle empty string', () => {
    expect(privateKeyToDesired('')).toBe('');
  });
});
