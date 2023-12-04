export function createElement(tagName, options = {}) {
  const { classes = [], props = {} } = options;
  const elem = document.createElement(tagName);
  const isString = typeof classes === 'string';
  if (classes || (isString && classes !== '') || (!isString && classes.length > 0)) {
    const classesArr = isString ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (!isString && classes.length === 0) elem.removeAttribute('class');

  if (props) {
    Object.keys(props).forEach((propName) => {
      const value = propName === props[propName] ? '' : props[propName];
      elem.setAttribute(propName, value);
    });
  }

  return elem;
}
export default function decorate(block) {
  const contentWrapper = block.querySelector(':scope > div > div:first-child');
  const callOutWrapper = block.querySelector(':scope > div > div:last-child');
  const parentContainer = contentWrapper.parentElement.parentElement;
  const picture = block.querySelector('picture');
  const pictureWrapper = picture.closest('p');
  const contentContainer = createElement('div', { classes: 'feature-content-container' });
  const mediaWrapper = createElement('div', { classes: 'feature-content-media' });
  parentContainer.prepend(mediaWrapper);
  mediaWrapper.appendChild(pictureWrapper);
  contentContainer.appendChild(contentWrapper);
  parentContainer.appendChild(contentContainer);
  parentContainer.appendChild(callOutWrapper);
  contentContainer.prepend(mediaWrapper);
  callOutWrapper.className = 'feature-callout-wrapper';
  contentWrapper.className = 'feature-content-wrapper';
}
