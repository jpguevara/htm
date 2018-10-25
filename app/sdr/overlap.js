import { createSdr } from "./createSdr";

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