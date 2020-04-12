function createElement(tagName, content, ...classes) {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  element.append(content);

  return element;
}

function createMetaKey(content, attr) {
  const mainClass = 'meta-key';
  const elemClass = `${mainClass}__label`;
  const childElem = createElement('DIV', content, elemClass);
  const metaKey = createElement('DIV', childElem, mainClass);
  metaKey.setAttribute('data-key', attr);

  return metaKey;
}

function createKeyChild(mainClass, lowSymbol, upperSymbol) {
  const lowercaseClass = `${mainClass}-lowercase`;
  const uppercaseClass = `${mainClass}-uppercase`;
  const elementWithLow = createElement('DIV', lowSymbol, lowercaseClass);
  const elementWithUpp = createElement('DIV', upperSymbol, uppercaseClass);
  const fragment = document.createDocumentFragment();
  fragment.append(elementWithLow, elementWithUpp);

  return createElement('DIV', fragment, mainClass);
}

function createKey(symbols, attr) {
  const [rusLow, rusUpp, enLow, enUpp] = symbols;
  const mainClass = 'key';
  const ruLangClass = `${mainClass}__ru`;
  const enLangClass = `${mainClass}__en`;
  const ruSymbols = createKeyChild(ruLangClass, rusLow, rusUpp);
  const enSymbols = createKeyChild(enLangClass, enLow, enUpp);
  const fragment = document.createDocumentFragment();
  fragment.append(ruSymbols, enSymbols);
  const key = createElement('DIV', fragment, mainClass);
  key.setAttribute('data-key', attr);

  return key;
}

function getCurrentKey(keyCode) {
  return document.body.querySelector(`[data-key="${keyCode}"]`);
}

function getDataFromStorage(item, defValue) {
  if (localStorage.getItem(item)) {
    return localStorage.getItem(item);
  }

  localStorage.setItem(item, defValue);
  return defValue;
}

function changDataInStorage(item, defValue, newVal) {
  const oldVal = localStorage.getItem(item);
  const currentVal = (oldVal === defValue) ? newVal : defValue;
  localStorage.setItem(item, currentVal);

  return {
    oldVal,
    currentVal,
  };
}

function stateChanger(cb, className, where) {
  const { oldVal, currentVal } = cb.call(this);
  const currentLangClass = `${className}--${currentVal}`;
  const oldLangClass = `${className}--${oldVal}`;

  [...where].forEach((element) => {
    element.classList.remove(oldLangClass);
    element.classList.add(currentLangClass);
  });
}

function createInfo() {
  const firstRowText = 'This keyboard Was created on windows OC';
  const secondRowHtml = 'Use <b>ctrl + alt</b> to switch language';
  const firstRow = createElement('DIV', firstRowText, 'keyboard__info-row');
  const secondRow = createElement('DIV', 'script.js', 'keyboard__info-row');
  secondRow.innerHTML = secondRowHtml;
  const fragment = document.createDocumentFragment();
  fragment.append(firstRow, secondRow);
  document.body.append(createElement('DIV', fragment, 'keyboard__info'));
}

export {
  createElement, createMetaKey, createKey, getCurrentKey,
  changDataInStorage, getDataFromStorage, stateChanger, createInfo,
};
