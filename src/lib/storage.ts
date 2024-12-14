import { MetadataStorage } from './metadata-storage';
import { getGlobal } from './util';

const globalScope = getGlobal();
const METADATA_STORAGE_KEY = Symbol.for('typescriptClassBuilderMetadataStorage');

if (!globalScope[METADATA_STORAGE_KEY]) {
  globalScope[METADATA_STORAGE_KEY] = new MetadataStorage();
}

export const getMetadataStorage = () => globalScope[METADATA_STORAGE_KEY] as MetadataStorage;
