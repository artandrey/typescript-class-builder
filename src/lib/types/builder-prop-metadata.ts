export interface BuilderPropMetadata {
  get: (target: object) => unknown;
  set: (target: object, value: unknown) => void;
}
