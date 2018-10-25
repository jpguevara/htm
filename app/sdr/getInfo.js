import { getW } from './getW';
import { getCapacity } from './getCapacity';


export function getInfo(sdr = []) {
  const n = sdr.length;
  const w = getW(sdr);
  const sparsity = getSparsity(n, w);
  const capacity = getCapacity(n, w);
  console.log('SDR: n=', n, ' w=', w, ' sparsity=', sparsity, 'capacity: ', capacity);
  console.log('OnBits: ', getOnBits(sdr));
  console.log('sdr: ', sdr);
}