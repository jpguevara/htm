import { factorial, divide, multiply, subtract, bignumber, number, config } from 'mathjs';


config({
  number: 'BigNumber', // Default type of number:
  // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64        // Number of significant digits for BigNumbers
});


/**
 * Calculates the capacity for an sdr, this is, the number of combinations of on W bits
 * that can be represented in a N value array.
 * @param {Number} n value
 * @param {number} w value
 */
export function getCapacity(n, w) {
  const bgN = bignumber(n);
  const bgW = bignumber(w);
  const x = factorial(bgN);
  const y = multiply(factorial(bgW), factorial(subtract(bgN, bgW)));
  return number(divide(x, y));
}