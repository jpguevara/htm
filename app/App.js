import { Base } from "./Base";

export function App(rootElement, component) {
  /**
   *
   * @param {*} component
   * @param {Base} instance
   */
  function runComponentAsClass(component) {
    const instance = new component();
    instance.eventEmitter.on("stateChanged", details => {
      instance.render(instance.state);
      refreshElement(instance.element);
    });
    instance.render(instance.state);
    return instance.element;
  }
  function refreshElement(el) {
    for (const key in rootElement.children) {
      if (rootElement.children.hasOwnProperty(key)) {
        const element = rootElement.children[key];
        rootElement.removeChild(element);
      }
    }
    rootElement.appendChild(el);
  }
  function start() {
    let componentElement = null;
    if (component.prototype.render) {
      componentElement = runComponentAsClass(component);
    }
    refreshElement(componentElement);
  }
  return { start };
}
