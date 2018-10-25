import { range, random } from 'underscore';

export function fillRandomSdr(sdr = [], w) {
  const n = sdr.length;
  const bitsToTurnOn = range(w).reduce((prev, current, index, array) => {
    let bitToTurnOn = random(0, n - 1);
    while (bitToTurnOn in prev) {
      console.log('repetido');
      bitToTurnOn = random(0, n - 1);
    }
    prev[bitToTurnOn] = 1;
    return prev;
  }, {});
  Object.keys(bitsToTurnOn).forEach(k => sdr[k] = 1);
  return sdr;
}