/**
 * W is the number of active bits it has.
 * @param {*} sdr
 */
export function getW(sdr = []) {
  const w = sdr.reduce((prev, value) => {
    return prev + (value === 1 ? 1 : 0);
  }, 0);
  return w;
}

export const getPopulation = getW;