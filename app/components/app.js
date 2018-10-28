// import code from other files like this
import { createSdr, overlap, injectNoise } from "../sdr";
import { h as _h, button, div } from "../libs/dom";
import _ from "underscore";
import { sdrCanvas } from "./sdrCanvas";
import { Base } from "../Base";

let sdr1 = createSdr({ n: 1024, w: 8, randomize: true });
let sdr2 = [...sdr1];
injectNoise(sdr2);
let overlapedSdr = overlap(sdr1, sdr2);

export class AppComponent extends Base {
  constructor() {
    super();
    console.log("constructor");
    this.state = { sdr1, sdr2, overlapedSdr };
  }

  generateNewSdr() {
    // const sdr1 = SDR.createSdr(16, 4);
    const sdr1 = createSdr({ n: 1024, w: 8, randomize: true });
    const sdr2 = [...sdr1];
    injectNoise(sdr2);
    const overlapedSdr = overlap(sdr1, sdr2);
    this.setState({ sdr1, sdr2, overlapedSdr });
  }
  render({ sdr1, sdr2, overlapedSdr }) {
    this.element = div(
      sdrCanvas(sdr1),
      sdrCanvas(sdr2),
      sdrCanvas(overlapedSdr),
      button("New Sdr", {
        onclick: () => {
          this.generateNewSdr();
        }
      })
    );
  }
}
