import { drawGrid } from '../sdr';
import { canvas } from '../libs/dom';

export const sdrCanvas = function (sdr) {
  const sizeInPixels = 100;
  const canvasProps = { width: sizeInPixels, height: sizeInPixels, style: "border:1px solid red;" };
  const c1 = canvas(canvasProps);
  const n = sdr.length;
  const rowsAndCols = Math.ceil(Math.sqrt(n));
  drawGrid(c1, { w: sizeInPixels, h: sizeInPixels, rows: rowsAndCols, cols: rowsAndCols, sdr });
  return c1;
};