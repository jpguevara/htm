
import { createSdr } from "./index";

describe('createSDR', () => {
  it('should create a sdr as an array', () => {
    const sdr = createSdr();
    expect(sdr).toBeArray();
  })
  it('should create a sdr as an array of n elements', () => {
    const n = 100;
    const sdr = createSdr({ n });
    expect(sdr).toBeArrayOfSize(n)
  })
  it('should create a sdr as an array of n elements filled with 0', () => {
    const n = 20;
    const w = 3;
    const sdr = createSdr({ n, w, randomize: false });
    expect(sdr).toBeArrayOfSize(n)
    expect(sdr).toBeArrayOfNumbers()

    const sum = sdr.reduce((prev, value) => { return prev + value }, 0);
    expect(sum).toBe(0, 'There are some values in the array.');

  })

  it('should throw error if w > n.', () => {
    const n = 20;
    const w = 21;

    const params = { n, w, randomize: false };


    expect(function () { createSdr(params); }).toThrowAnyError();
  })
});