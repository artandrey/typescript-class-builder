import { MetadataStorage } from './metadata-storage';
import { getGlobal } from './util';

const globalScope = getGlobal();

if (!globalScope.typescriptClassBuilderMetadataStorage) {
  globalScope.typescriptClassBuilderMetadataStorage = new MetadataStorage();
}

export const metadataStorage = globalScope.typescriptClassBuilderMetadataStorage as MetadataStorage;
