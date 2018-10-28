import { EventEmitter } from "events";

// import { EventEmitter } from "./libs/EventEmitter";

export class Base {
  constructor() {
    this.state = {};
    this.element = null;
    this.eventEmitter = new EventEmitter();
  }

  stateChanged(details = { newState, prevState }) {
    this.eventEmitter.emit("stateChanged", details);
  }

  setState(newState) {
    const prevState = this.state;
    this.state = newState;
    this.stateChanged({ newState, prevState });
    this.render(this.state);
  }

  render(state) {
    return this.element;
  }
}
