const keyboardKeys = [
  [
    ['ё', 'Ё', '`', '~'], ['1', '!', '1', '!'], ['2', '\x22', '2', '@'],
    ['3', '№', '3', '#'], ['4', ';', '4', '$'], ['5', '%', '5', '%'],
    ['6', ':', '6', '^'], ['7', '?', '7', '&'], ['8', '*', '8', '*'],
    ['9', '(', '9', '('], ['0', ')', '0', ')'], ['-', '_', '-', '_'],
    ['=', '+', '=', '+'], ['Backspace'],
  ],
  [
    ['Tab'], ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'],
    ['к', 'К', 'r', 'R'], ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'],
    ['ш', 'Ш', 'i', 'I'], ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'],
    ['х', 'Х', '[', '{'], ['ъ', 'Ъ', ']', '}'], ['\x5c', '/', '\x5c', '|'], ['Del'],
  ],

  [
    ['CapsLock'], ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'],
    ['в', 'В', 'd', 'D'], ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'],
    ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'], ['л', 'Л', 'k', 'K'],
    ['д', 'Д', 'l', 'L'], ['ж', 'Ж', ';', ':'], ['э', 'Э', '\x27', '\x22'],
    ['Enter'],
  ],

  [
    ['Shift'], ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'],
    ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'],
    ['ь', 'Ь', 'm', 'M'], ['б', 'Б', '.', '<'], ['ю', 'Ю', ',', '>'],
    ['.', ',', '/', '?'], ['▲', '▲', '▲', '▲'], ['Shift'],
  ],

  [
    ['Ctrl'], ['Win'], ['Alt'], ['Space'],
    ['Alt'], ['◄', '◄', '◄', '◄'], ['▼', '▼', '▼', '▼'],
    ['►', '►', '►', '►'], ['Ctrl'],
  ],
];

const specialCase = {
  б: 'Comma',
  ё: 'Backquote',
  ю: 'Period',
  '.': 'Slash',
  ж: 'Semicolon',
  э: 'Quote',
  х: 'BracketLeft',
  ъ: 'BracketRight',
  '-': 'Minus',
  '=': 'Equal',
  0: 'Digit0',
  1: 'Digit1',
  2: 'Digit2',
  3: 'Digit3',
  4: 'Digit4',
  5: 'Digit5',
  6: 'Digit6',
  7: 'Digit7',
  8: 'Digit8',
  9: 'Digit9',
  '◄': 'ArrowLeft',
  '►': 'ArrowRight',
  '▼': 'ArrowDown',
  '▲': 'ArrowUp',
  '\x5c': 'Backslash',
  Del: 'Delete',
};

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

  for (let i = 0; i < where.length; i += 1) {
    const element = where[i];
    element.classList.remove(oldLangClass);
    element.classList.add(currentLangClass);
  }
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

class Keyboard {
  constructor(initialData) {
    this.keyboardKeysData = initialData;
    this.className = 'keyboard';
    this.btnPrefix = 'Key';
    this.keyboard = null;
    this.textArea = null;
    this.keyboardRows = null;
    this.defActiveCase = 'lowercase';
    this.defActiveLang = 'ru';

    this.keyboardSurfaceClass = `${this.className}__surface`;
    this.textAreaClass = `${this.className}__input`;
    this.wrapperClass = `${this.className}__wrapper`;
    this.metaKeyClass = 'meta-key';
    this.keyClass = 'key';
    this.debounce = true;
    this.startPos = null;
    this.focus = false;
  }

  preventInput() {
    function onKeyDown(e) {
      e.preventDefault();
    }
    this.textArea.addEventListener('keydown', onKeyDown.bind(this));
  }

  processTextArea() {
    function onBlur() {
      this.focus = false;
    }

    function onFocus() {
      this.focus = true;
    }

    function mouseUp() {
      this.startPos = this.textArea.selectionStart;
      this.textArea.selectionEnd = this.startPos;
    }

    this.textArea.addEventListener('blur', onBlur.bind(this));
    this.textArea.addEventListener('focus', onFocus.bind(this));
    this.textArea.addEventListener('mouseup', mouseUp.bind(this));
  }

  getLang() {
    return getDataFromStorage.call(this, 'lang', this.defActiveLang);
  }

  changeLang() {
    return changDataInStorage.call(this, 'lang', this.defActiveLang, 'en');
  }

  changeKeyboardLang() {
    stateChanger.call(this, this.changeLang, this.className, this.keyboardRows);
  }

  getCase() {
    return getDataFromStorage('case', this.defActiveCase);
  }

  changeCase() {
    return changDataInStorage('case', this.defActiveCase, 'uppercase');
  }

  changeKeyboardCase() {
    stateChanger.call(this, this.changeCase, this.className, this.keyboardRows);
  }

  createRows(lang, keyCase) {
    this.keyboardRows = document.createDocumentFragment();
    const rowsModificators = ['--first', '--second', '--third', '--fourth', '--fifth'];
    const rowClass = `${this.className}-row`;
    const activeLang = `${this.className}--${lang}`;
    const activeCase = `${this.className}--${keyCase}`;

    for (let i = 0; i < rowsModificators.length; i += 1) {
      const rowClassWithMod = `${rowClass}${rowsModificators[i]}`;
      this.keyboardRows.append(createElement('DIV', '', rowClass, rowClassWithMod, activeLang, activeCase));
    }
  }

  getKeyAttr(arrOfSymbols, arr, pos) {
    let firstSymbol = arrOfSymbols[0];
    const lastSymbol = arrOfSymbols[arrOfSymbols.length - 1];
    const specialAttrValue = specialCase[firstSymbol];

    if (specialAttrValue) {
      return specialAttrValue;
    }

    if (arrOfSymbols.length === 1) {
      if (firstSymbol === 'Shift' || firstSymbol === 'Alt' || firstSymbol === 'Alt' || firstSymbol === 'Ctrl' || firstSymbol === 'Win') {
        const mid = Math.floor(arr.length / 2);
        const prefix = (pos < mid) ? 'Left' : 'Right';
        if (firstSymbol === 'Ctrl') {
          firstSymbol = 'Control';
        }
        if (firstSymbol === 'Win') {
          firstSymbol = 'Meta';
        }
        return `${firstSymbol}${prefix}`;
      }
      if (firstSymbol === 'capslock') {
        firstSymbol = 'capsLock';
      }

      return `${firstSymbol}`;
    }
    return `${this.btnPrefix}${lastSymbol}`;
  }

  createAndFillRows() {
    const lang = this.getLang();
    const keyCase = this.getCase();
    this.createRows(lang, keyCase);

    for (let i = 0; i < this.keyboardKeysData.length; i += 1) {
      const rowData = this.keyboardKeysData[i];
      const row = this.keyboardRows.children[i];
      for (let j = 0; j < rowData.length; j += 1) {
        const symbols = rowData[j];
        const attrVal = this.getKeyAttr(symbols, rowData, j);
        if (symbols.length === 1) {
          row.append(createMetaKey(symbols[0], attrVal));
        } else {
          row.append(createKey(symbols, attrVal));
        }
      }
    }
  }

  createKeyboard() {
    this.createAndFillRows();
    const keyboardSurface = createElement('DIV', this.keyboardRows, this.keyboardSurfaceClass);
    keyboardSurface.append(this.keyboardRows);
    this.textArea = createElement('TEXTAREA', '', this.textAreaClass);
    const wrapper = createElement('DIV', '', this.wrapperClass);
    wrapper.append(this.textArea, keyboardSurface);
    this.keyboard = createElement('DIV', wrapper, this.className);
    this.keyboardRows = wrapper.querySelector(`.${this.keyboardSurfaceClass}`).children;
  }

  changeKeyState(currentKey, flag) {
    const isMetaKey = currentKey.classList.contains(this.metaKeyClass);
    const isKey = currentKey.classList.contains(this.keyClass);
    const metaKeyActiveClass = `${this.metaKeyClass}--active`;
    const keyActiveClass = `${this.keyClass}--active`;

    if (isMetaKey && flag) {
      currentKey.classList.remove(metaKeyActiveClass);
    } else if (isKey && flag) {
      currentKey.classList.remove(keyActiveClass);
    } else if (isMetaKey) {
      currentKey.classList.add(metaKeyActiveClass);
    } else if (isKey) {
      currentKey.classList.add(keyActiveClass);
    }
  }

  setCaretPosition() {
    this.startPos = (this.startPos <= 0) ? 0 : this.startPos - 1;
    this.textArea.selectionEnd = this.startPos;
    this.textArea.selectionStart = this.startPos;
  }

  removeSymbol(code) {
    const text = this.textArea.value;

    if (code === 'Delete') {
      this.textArea.value = `${text.slice(0, this.startPos)}${text.slice(this.startPos + 1)}`;
      this.textArea.selectionEnd = this.startPos;
    } else if (this.startPos <= 0) {
      return false;
    } else if (code === 'Backspace' && text.length === this.startPos && this.focus) {
      this.textArea.value = `${text.slice(0, text.length - 1)}`;
      this.setCaretPosition();
    } else if (code === 'Backspace') {
      this.textArea.value = `${text.slice(0, this.startPos - 1)}${text.slice(this.startPos)}`;
      this.setCaretPosition();
    }
    return true;
  }

  insertSymbol(sym) {
    const text = this.textArea.value;
    this.textArea.value = `${text.slice(0, this.startPos)}${sym}${text.slice(this.startPos)}`;
    this.startPos += 1;
    this.textArea.selectionEnd = this.startPos;
    this.textArea.selectionStart = this.startPos;
  }

  processInput(current, code, evt) {
    const text = current.querySelector(`.${this.keyClass}__${this.getLang()}-${this.getCase()}`);
    if (text) {
      this.insertSymbol(text.textContent);
    } else if (code === 'Tab') {
      this.insertSymbol('\t');
    } else if (code === 'Delete' && this.focus) {
      this.removeSymbol(code);
    } else if (code === 'Backspace') {
      this.removeSymbol(code);
    } else if (code === 'Space') {
      this.insertSymbol(' ');
    } else if (code === 'Enter') {
      this.insertSymbol('\n');
    } else if ((code === 'ShiftLeft' && this.debounce) || (code === 'ShiftRight' && this.debounce)) {
      this.changeKeyboardCase();
      this.debounce = false;
    } else if (evt && evt.ctrlKey && evt && evt.altKey) {
      this.changeKeyboardLang();
    } else if (code === 'CapsLock') {
      document.body.querySelector(`[data-key="${code}"]`).classList.toggle('meta-key--active-caps');
      this.changeKeyboardCase();
    }
  }

  onKeyDown(evt) {
    const currentKey = getCurrentKey(evt.code);
    this.changeKeyState(currentKey);
    this.processInput(currentKey, evt.code, evt);
  }

  onKeyUp(evt) {
    const currentKey = getCurrentKey(evt.code);
    this.changeKeyState(currentKey, true);
    evt.preventDefault();

    if (evt.ctrlKey && evt.altKey) {
      this.changeKeyboardLang();
    }

    if (evt.code === 'ShiftLeft' || evt.code === 'ShiftRight') {
      this.changeKeyboardCase();
      this.debounce = true;
    }
  }

  onMouseDown(e) {
    const { target } = e;
    const key = target.closest(`.${this.metaKeyClass}`) || target.closest(`.${this.keyClass}`);

    if (!key) {
      return false;
    }

    const keyValAttr = key.getAttribute('data-key');
    this.changeKeyState(key);
    this.processInput(key, keyValAttr);

    setTimeout(() => {
      this.changeKeyState(key, true);
    }, 100);
    return true;
  }

  onMouseUp(e) {
    const { target } = e;
    const key = target.closest(`.${this.metaKeyClass}`) || target.closest(`.${this.keyClass}`);

    if (!key) {
      return false;
    }
    return true;
  }

  capsLockStateCheck() {
    const capsLockBtn = document.querySelector('[data-key="CapsLock"]');
    const caseState = this.getCase();

    if (caseState === 'uppercase') {
      capsLockBtn.classList.add('meta-key--active-caps');
    }

    if (caseState === 'lowercase') {
      capsLockBtn.classList.remove('meta-key--active-caps');
    }
  }

  init() {
    this.createKeyboard();
    document.body.prepend(this.keyboard);
    createInfo();
    this.processTextArea();
    this.preventInput();
    this.capsLockStateCheck();
    document.body.addEventListener('keydown', this.onKeyDown.bind(this));
    document.body.addEventListener('keyup', this.onKeyUp.bind(this));
    this.keyboard.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.keyboard.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
}


window.addEventListener('load', () => {
  const keyboard = new Keyboard(keyboardKeys);
  keyboard.init();
});
