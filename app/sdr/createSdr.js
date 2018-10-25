import { fillRandomSdr } from "./fillRandomSdr";

export function createSdr({ n = 2048, w = 40, randomize = false } = {}) {
  const sdr = Array(n).fill(0);
  if (w > n) {
    throw 'sdr w value cant be greather than n.';
  }
  randomize && fillRandomSdr(sdr, w);
  return sdr;
}