/**
 *
 * @param {*} n Lenght of the array or max number of bits in the array.
 * @param {*} w Number of ON bits at the same time
 */
export function getSparsity(n, w) {
  return w / n;
}