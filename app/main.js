// import code from other files like this
const SDR = require('./SDR');
const dom = require('./libs/dom');
const _ = require('underscore');








function generateNewSdr() {
  // const sdr1 = SDR.createSDR(16, 4);
  const sdr1 = SDR.createSDR(1024, 8);
  const sdr2 = [...sdr1];

  SDR.getInfo(sdr1);
  // SDR.injectNoise(sdr2);
  // SDR.getInfo(sdr2);

  const n = sdr1.length;
  const rowsAndCols = Math.ceil(Math.sqrt(n));
  SDR.drawGrid(canvas, { w: 400, h: 400, rows: rowsAndCols, cols: rowsAndCols, sdr: sdr1 });
}



const canvas = dom.h('canvas', { width: 400, height: 400, style: "border:1px solid red;" });
const btnNew = dom.button('new', {
  onclick: generateNewSdr
});
const containerDiv = dom.div(canvas, btnNew)

// window.setInterval(generateNewSdr, 100);

document.body.appendChild(containerDiv);