export function privateKeyToDesired(key: string) {
  if (!key.startsWith('_')) {
    return key;
  }

  return key.slice(1);
}
