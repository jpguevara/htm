import { random } from 'underscore';
import { getBitsOn } from "./getBitsOn";
import { getW } from "./getW";

/**
 * Generates noise base in the sdr
 * @param {[number]} sdr
 * @param {decimal} noisePercentaje
 */
export function injectNoise(sdr, noisePercentaje = 0.33) {
  const w = getW(sdr);
  const n = sdr.length;

  if (w > n) {
    throw 'sdr w value cant be greather than n.';
  }
  const maxNoiseBits = Math.floor(w * noisePercentaje);
  const onBits = getBitsOn(sdr);
  function getBitsToTurnOff() {
    const bitsToTurnOff = [];
    let noiseBitCounter = 0;
    while (noiseBitCounter < maxNoiseBits) {
      const bitToTurnOff = onBits[random(0, w - 1)];
      if (!bitsToTurnOff.includes(bitToTurnOff)) {
        bitsToTurnOff.push(bitToTurnOff);
        noiseBitCounter++;
      }
    }
    return bitsToTurnOff;
  }
  function getBitsToTurnOn() {
    const bitsToTurnOn = [];
    let noiseBitCounter = 0;
    while (noiseBitCounter < maxNoiseBits) {
      const bitToTurnOn = random(0, n - 1);
      if (!bitsToTurnOn.includes(bitToTurnOn) && !onBits.includes(bitToTurnOn)) {
        bitsToTurnOn.push(bitToTurnOn);
        noiseBitCounter++;
      }
    }
    return bitsToTurnOn;
  }
  const bitsToTurnOff = getBitsToTurnOff();
  const bitsToTurnOn = getBitsToTurnOn();
  bitsToTurnOff.forEach(bit => sdr[bit] = 0);
  bitsToTurnOn.forEach(bit => sdr[bit] = 1);
}