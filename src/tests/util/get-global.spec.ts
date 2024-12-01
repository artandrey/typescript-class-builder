import { getGlobal } from '~lib/util';

describe('getGlobal() test in node js environment', () => {
  it('expect Buffer to be defined', () => {
    expect(getGlobal().Buffer).toBeDefined();
  });

  it('expect Buffer to be undefined', () => {
    const bufferImp = global.Buffer;
    delete global.Buffer;

    expect(getGlobal().Buffer).not.toBeDefined();

    global.Buffer = bufferImp;
  });
});
