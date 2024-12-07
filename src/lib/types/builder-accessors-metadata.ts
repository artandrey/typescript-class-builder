export interface BuilderAccessorsMetadata {
  get: (target: object) => unknown;
  set: (target: object, value: unknown) => void;
}
