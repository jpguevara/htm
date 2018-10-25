/**
 *
 * @param {[number]} sdr
 */
export function getBitsOn(sdr) {
  const bitsOn = [];
  sdr.forEach((value, index) => {
    value === 1 && bitsOn.push(index);
  });
  return bitsOn;
}