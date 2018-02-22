const _ = require('underscore');
const math = require('mathjs');
const { factorial, divide, multiply, subtract, bignumber, number } = require('mathjs');

math.config({
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
  const bitsToTurnOn = _.range(w).reduce((prev, current, index, array) => {


    let bitToTurnOn = _.random(0, n - 1);
    while (bitToTurnOn in prev) {
      console.log('repetido');
      bitToTurnOn = _.random(0, n - 1);
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

function reset(sdr, value) {
  const n = sdr.length;
  _.range(n).forEach((v, i) => {
    sdr[i] = value;
  });

  return sdr;
}

function createSDR(n = 2048, w = 40) {
  const sdr = Array(n);
  reset(sdr, 0);
  fillRandomSdr(sdr, w);
  return sdr;
}

function getInfo(sdr = []) {
  const n = sdr.length;
  const w = getW(sdr);
  const sparsity = getSparsity(n, w);
  const capacity = getCapacity(n, w);
  console.log('SDR: n=', n, ' w=', w, ' sparsity=', sparsity, 'capacity: ', capacity);
  console.log('sdr: ', sdr);
}

function getOnBits(sdr = []) {
  const onBits = [];
  sdr.forEach((value, index) => {
    value === 1 && onBits.push(index);
  });

  return onBits;
}

function injectNoise(sdr = [], noisePercentaje = 0.33) {
  const w = getW(sdr);
  const maxNoiseBits = Math.floor(w * 3);

  const onBits = getOnBits(sdr);

  onBits.forEach((bitIndex) => {

  });
  const noiseBits = {};




}

module.exports = {
  getSparsity,
  getCapacity,
  createSDR,
  getInfo
};