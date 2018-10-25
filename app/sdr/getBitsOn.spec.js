
import { createSdr } from "./createSdr";
import { getBitsOn } from "./getBitsOn";
describe('getBitsOn', () => {
  it('should return an array with ones', () => {

    const n = 20;
    const w = 3;

    const params = { n, w, randomize: true };
    const sdr = createSdr(params);

    const onBits = getBitsOn(sdr);
    expect(onBits).toBeArrayOfSize(w);

    const sum = sdr.reduce((prev, value) => { return prev + value }, 0);
    expect(sum).toBe(3);

  });

  it('should return an array with zeros', () => {

    const n = 20;
    const w = 3;

    const params = { n, w, randomize: false };
    const sdr = createSdr(params);

    const bitsOn = getBitsOn(sdr);
    expect(bitsOn).toBeArrayOfSize(0);

    const sum = sdr.reduce((prev, value) => { return prev + value }, 0);
    expect(sum).toBe(0);

  });
});