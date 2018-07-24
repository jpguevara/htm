
function appendArray(el, children) {
  children.forEach(child => {
    if (typeof child === 'string') {
      appendText(el, child);
    } else if (child instanceof window.Element) {
      el.appendChild(child);
    } else if (typeof child === 'object') {
      setProperties(el, child);
    } else {
      console.warn(`Invalid child ${child} for element ${el}`);
    }
  });
}

function appendText(el, text) {
  const node = document.createTextNode(text);
  el.appendChild(node);
}

function setProperties(el, props) {
  Object.keys(props).forEach(propName => {
    if (propName in el) {
      el[propName] = props[propName];
    } else {
      console.warn(`${el} doesn't have a property ${propName}.`);
      // if (propName === 'for') {
      //   console.warn('did you mean "htmlFor"');
      // }
    }
  });
}

/**
 * makes and return a dom element with the type and properties.
 * @param {string} type the type of the dom element.
 * @param {string|{}} textOrProps the text, child, or element properties
 * @param {any} otherChildren 
 */
function h(type, textOrProps, ...otherChildren) {
  const el = document.createElement(type);

  if (Array.isArray(textOrProps)) {
    appendArray(el, textOrProps);
  } else if (typeof textOrProps === 'string') {
    appendText(el, textOrProps);
  } else if (textOrProps instanceof window.Element) {
    el.appendChild(textOrProps);
  } else if (typeof textOrProps === 'object') {
    setProperties(el, textOrProps);
  } else {
    console.warn(`Unknown ${textOrProps} for type ${type}.`);
  }

  if (otherChildren && otherChildren.length > 0) {
    appendArray(el, otherChildren);
  }
  return el;
}

// const h1 = (...args) => makeElement('h1', ...args);
// const h2 = (...args) => makeElement('h2', ...args);
// const div = (...args) => makeElement('div', ...args);
// const input = (...args) => makeElement('input', ...args);
// const label = (...args) => makeElement('label', ...args);
// const button = (...args) => makeElement('button', ...args);

module.exports = {
  h,
  // h1, h2, div, input, label, button
  h1: (...args) => h('h1', ...args),
  h2: (...args) => h('h2', ...args),
  div: (...args) => h('div', ...args),
  input: (...args) => h('input', ...args),
  label: (...args) => h('label', ...args),
  button: (...args) => h('button', ...args),
  canvas: (...args) => h('canvas', ...args)
};