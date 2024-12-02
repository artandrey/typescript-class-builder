import { getGlobal } from '~lib/util';

describe('getGlobal() test in node js environment', () => {
  it('expect Buffer to be defined', () => {
    expect(getGlobal().Buffer).toBeDefined();
  });

  it('expect Buffer to be undefined', () => {
    const bufferImp = global.Buffer;
    // @ts-expect-error - Buffer should not be deleted in node environment
    delete global.Buffer;

    expect(getGlobal().Buffer).not.toBeDefined();

    global.Buffer = bufferImp;
  });
});
