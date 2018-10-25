// import code from other files like this
import { createSDR, injectNoise, overlap } from './sdr';
import { drawGrid } from './sdr/render';
import { h as _h, button, div } from './libs/dom';
import _ from 'underscore';

let sdr1 = createSDR({ n: 1024, w: 8, randomize: true });
let sdr2 = [...sdr1];
injectNoise(sdr2);
let overlapedSdr = overlap(sdr1, sdr2);

function redraw(c1, c2, c3, s1, s2, s3) {
  const n = s1.length;
  const rowsAndCols = Math.ceil(Math.sqrt(n));
  drawGrid(c1, { w: size, h: size, rows: rowsAndCols, cols: rowsAndCols, sdr: s1 });
  drawGrid(c2, { w: size, h: size, rows: rowsAndCols, cols: rowsAndCols, sdr: s2 });
  drawGrid(c3, { w: size, h: size, rows: rowsAndCols, cols: rowsAndCols, sdr: s3 });
}

function generateNewSdr(c1, c2, c3) {
  // const sdr1 = SDR.createSDR(16, 4);
  sdr1 = createSDR({ n: 1024, w: 8, randomize: true });
  sdr2 = [...sdr1];
  injectNoise(sdr2);
  overlapedSdr = overlap(sdr1, sdr2);

  redraw(c1, c2, c3, sdr1, sdr2, overlapedSdr);
}

const size = 100;
const canvas1 = _h('canvas', { width: size, height: size, style: "border:1px solid red;" });
const canvas2 = _h('canvas', { width: size, height: size, style: "border:1px solid red;" });
const canvas3 = _h('canvas', { width: size, height: size, style: "border:1px solid red;" });

const btnNew = button('new', {
  onclick: () => generateNewSdr(canvas1, canvas2, canvas3)
});

const containerDiv = div(canvas1, canvas2, canvas3, btnNew)

// window.setInterval(generateNewSdr, 100);

document.body.appendChild(containerDiv);