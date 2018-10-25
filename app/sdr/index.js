import { range, random } from 'underscore';
import { config } from 'mathjs';
import { factorial, divide, multiply, subtract, bignumber, number } from 'mathjs';

config({
  number: 'BigNumber', // Default type of number:
  // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64        // Number of significant digits for BigNumbers
});



/**
 * 
 * @param {*} n Lenght of the array or max number of bits in the array.
 * @param {*} w Number of ON bits at the same time
 */
function getSparsity(n, w) {
  return w / n;
}

/**
 * Calculates the capacity for an sdr, this is, the number of combinations of on W bits 
 * that can be represented in a N value array.
 * @param {Number} n value
 * @param {number} w value
 */
function getCapacity(n, w) {
  const bgN = bignumber(n);
  const bgW = bignumber(w);
  const x = factorial(bgN);
  const y = multiply(factorial(bgW), factorial(subtract(bgN, bgW)))
  return number(divide(x, y));
}

function fillRandomSdr(sdr = [], w) {
  const n = sdr.length;
  const bitsToTurnOn = range(w).reduce(
    (prev, current, index, array) => {
      let bitToTurnOn = random(0, n - 1);
      while (bitToTurnOn in prev) {
        console.log('repetido');
        bitToTurnOn = random(0, n - 1);
      }

      prev[bitToTurnOn] = 1;

      return prev;
    }, {})

  Object.keys(bitsToTurnOn).forEach(k => sdr[k] = 1);
  return sdr;
}

function getW(sdr = []) {
  const w = sdr.reduce((prev, value) => {
    return prev + (value === 1 ? 1 : 0);
  }, 0);
  return w;
}

const getPopulation = getW;

/**
 * 
 * @param {[]} sdr 
 * @param {*} value 
 */
function reset(sdr, value) {
  sdr.fill(value);
  return sdr;
}

export function createSdr({ n = 2048, w = 40, randomize = false } = {}) {
  const sdr = Array(n).fill(0);
  if (w > n) {
    throw 'the sdr w value cant be greather that n.';
  }
  randomize && fillRandomSdr(sdr, w);
  return sdr;
}

function getInfo(sdr = []) {
  const n = sdr.length;
  const w = getW(sdr);
  const sparsity = getSparsity(n, w);
  const capacity = getCapacity(n, w);
  console.log('SDR: n=', n, ' w=', w, ' sparsity=', sparsity, 'capacity: ', capacity);
  console.log('OnBits: ', getOnBits(sdr));
  console.log('sdr: ', sdr);

}
/**
 * 
 * @param {[number]} sdr 
 */
function getOnBits(sdr) {
  const onBits = [];
  sdr.forEach((value, index) => {
    value === 1 && onBits.push(index);
  });

  return onBits;
}

/**
 * Generates noise base in the sdr
 * @param {[number]} sdr 
 * @param {decimal} noisePercentaje 
 */
export function injectNoise(sdr, noisePercentaje = 0.33) {
  const w = getW(sdr);
  const n = sdr.length;

  const maxNoiseBits = Math.floor(w * noisePercentaje);

  const onBits = getOnBits(sdr);

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



export const overlap = (sdr1, sdr2) => {
  if (sdr1.length !== sdr2.length) {
    throw 'Cant overlap if SDR are not from the same size.';
  }

  const n = sdr1.length;
  const overlapedSdr = createSdr({ n, w: 0 });
  for (let i = 0; i < n; i++) {
    overlapedSdr[i] = sdr1[i] && sdr2[i];
  }
  return overlapedSdr;
}
