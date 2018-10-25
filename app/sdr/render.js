
export const drawGrid = (canvas, { w = 200, h = 200, rows, cols, bgColor = 'white', sdr = [] }) => {
  if (!canvas) { console.error('No canvas found:', canvas); }
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  console.log('cols: ', cols);
  const cellSizeWidth = w / cols;
  const cellSizeHeight = h / rows;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  function drawLine(x, y, x1, y1) {
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'lightgrey';
    // ctx.lineWidth = '1';
    ctx.stroke();
  }

  function drawCell(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    // ctx.rect(x, y, w, h);
    ctx.strokeStyle = 'grey';
    ctx.stroke();
  }

  function drawCellAt({ row, col, fillColor = 'white' }) {
    const x0 = row * cellSizeHeight;
    const y0 = col * cellSizeWidth;
    drawCell(x0, y0, cellSizeWidth, cellSizeHeight, fillColor);
  }

  function sdrToGridCoordinates(index) {
    const x = (index % cols);
    const y = Math.floor(index / cols);
    return { x, y };
  }

  // for (let row = 0; row <= rows; row++) {
  //   drawLine(0, row * cellSizeHeight, w, row * cellSizeHeight);
  // }
  // for (let col = 0; col <= cols; col++) {
  //   drawLine(col * cellSizeWidth, 0, col * cellSizeWidth, h);
  // }

  sdr.forEach((cell, index) => {
    const pos = sdrToGridCoordinates(index);
    drawCellAt({ row: pos.x, col: pos.y, fillColor: (cell === 1 ? 'blue' : 'white') });
  });
}