// import code from other files like this
const SDR = require('./SDR');
const dom = require('./libs/dom');
const _ = require('underscore');




// const sdr1 = SDR.createSDR(16, 4);
const sdr1 = SDR.createSDR(16, 4);
const sdr2 = [...sdr1];

SDR.getInfo(sdr1);
SDR.injectNoise(sdr2);
SDR.getInfo(sdr2);

const n = sdr1.length;


const drawGrid = function (w, h, idOrElement) {

  const canvas = idOrElement instanceof window.Element ? idOrElement : document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  const cellSize = 40;
  const cellSizeHeight = 40;
  const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> 
      <defs> 
          <pattern id="smallGrid" width="${cellSize}" height="${cellSizeHeight}" patternUnits="userSpaceOnUse"> 
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> 
          </pattern> 
          
      </defs> 
      <rect width="100%" height="100%" fill="url(#grid)" /> 
  </svg>`;

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  }
  img.src = url;
}



const grid = dom.h('canvas', { id: 'grid' });


drawGrid(400, 400, grid);
document.body.appendChild(grid);