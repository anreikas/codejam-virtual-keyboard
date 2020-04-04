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

function createMetaKey(content, ...classes) {
  const mainClass = 'meta-key';
  const elemClass = `${mainClass}__label`;
  const childElem = createElement('DIV', content, elemClass);

  return createElement('DIV', childElem, mainClass, classes);
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

function createKey(symbols, cls) {
  const [rusLow, rusUpp, enLow, enUpp] = symbols;
  const mainClass = 'key';
  const ruLangClass = `${mainClass}__ru`;
  const enLangClass = `${mainClass}__en`;
  const ruSymbols = createKeyChild(ruLangClass, rusLow, rusUpp);
  const enSymbols = createKeyChild(enLangClass, enLow, enUpp);
  const fragment = document.createDocumentFragment();
  fragment.append(ruSymbols, enSymbols);

  return createElement('DIV', fragment, mainClass, cls);
}

function getCurrentKey(keyCode) {
  const code = `${keyCode[0].toLowerCase()}${keyCode.slice(1)}`;
  return document.body.querySelector(`.${code}`);
}

class Keyboard {
  constructor(data) {
    this.data = data;
    this.className = 'keyboard';
    this.btnClass = 'key';
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
  }

  preventInput(e) {
    this.textArea.addEventListener('input', function (e) {
      if (e.inputType !== 'deleteContentBackward') {
        this.value = this.value.slice(0, this.value.length - 1);
      }
      e.preventDefault();
    });
  }

  getLang() {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang');
    }

    localStorage.setItem('lang', this.defActiveLang);
    return this.defActiveLang;
  }

  changeLang() {
    const oldLang = localStorage.getItem('lang');
    const currentLang = (oldLang === this.defActiveLang) ? 'en' : this.defActiveLang;
    localStorage.setItem('lang', currentLang);

    return {
      oldLang,
      currentLang,
    };
  }

  changeKeyboardLang() {
    const { oldLang, currentLang } = this.changeLang();
    const currentLangClass = `${this.className}--${currentLang}`;
    const oldLangClass = `${this.className}--${oldLang}`;

    for (let i = 0; i < this.keyboardRows.length; i += 1) {
      const element = this.keyboardRows[i];
      element.classList.remove(oldLangClass);
      element.classList.add(currentLangClass);
    }
  }

  getCase() {
    if (localStorage.getItem('case')) {
      return localStorage.getItem('case');
    }

    localStorage.setItem('case', this.defActiveCase);
    return this.defActiveCase;
  }

  changeCase() {
    const oldCase = localStorage.getItem('case');
    const currentCase = (oldCase === this.defActiveCase) ? 'uppercase' : this.defActiveCase;
    localStorage.setItem('case', currentCase);

    return {
      oldCase,
      currentCase,
    };
  }

  changeKeyboardCase() {
    const { oldCase, currentCase } = this.changeCase();
    // debugger;
    const currentCaseClass = `${this.className}--${currentCase}`;
    const oldCaseClass = `${this.className}--${oldCase}`;

    for (let i = 0; i < this.keyboardRows.length; i += 1) {
      const element = this.keyboardRows[i];
      element.classList.remove(oldCaseClass);
      element.classList.add(currentCaseClass);
    }
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

  getModificator(arrOfSymbols, arr, pos) {
    let firstSymbol = arrOfSymbols[0].toLowerCase();
    const lastSymbol = arrOfSymbols[arrOfSymbols.length - 1];
    const specialModificator = specialCase[firstSymbol];

    if (specialModificator) {
      return `${specialModificator.toLowerCase()}`;
    }

    if (arrOfSymbols.length === 1) {
      if (firstSymbol === 'shift' || firstSymbol === 'alt' || firstSymbol === 'alt' || firstSymbol === 'ctrl' || firstSymbol === 'win') {
        const mid = Math.floor(arr.length / 2);
        const prefix = (pos < mid) ? 'Left' : 'Right';
        if (firstSymbol === 'ctrl') {
          firstSymbol = 'control';
        }
        if (firstSymbol === 'win') {
          firstSymbol = 'meta';
        }
        return `${firstSymbol}${prefix}`;
      }
      if (firstSymbol === 'capslock') {
        firstSymbol = 'capsLock';
      }

      return `${firstSymbol}`;
    }
    return `${this.btnClass}${lastSymbol}`;
  }

  createAndFillRows() {
    const lang = this.getLang();
    const keyCase = this.getCase();
    this.createRows(lang, keyCase);

    for (let i = 0; i < this.data.length; i += 1) {
      const rowData = this.data[i];
      const row = this.keyboardRows.children[i];
      for (let j = 0; j < rowData.length; j += 1) {
        const symbols = rowData[j];
        const classWithMod = this.getModificator(symbols, rowData, j);
        if (symbols.length === 1) {
          row.append(createMetaKey(symbols[0], classWithMod));
        } else {
          row.append(createKey(symbols, classWithMod));
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

    // refresh link to rows
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

  processInput(current, evt) {
    const { code } = evt;
    const text = current.querySelector(`.${this.keyClass}__${this.getLang()}-${this.getCase()}`);

    if (text) {
      this.textArea.value += text.textContent;
    } else if (code === 'Tab') {
      evt.preventDefault();
      this.textArea.value += '\t';
    } else if (code === 'Del') {
      //!
    } else if (code === 'Backspace') {
      //!
    } else if (code === 'Space') {
      this.textArea.value += ' ';
    } else if (code === 'Enter') {
      this.textArea.value += '\n';
    } else if ((code === 'ShiftLeft' && this.debounce) || (code === 'ShiftRight' && this.debounce)) {
      this.changeKeyboardCase();
      this.debounce = false;
    } else if (evt.ctrlKey && evt.altKey) {
      this.changeKeyboardLang();
    } else if (code === 'CapsLock') {
      this.changeKeyboardCase();
    }
  }

  onKeyDown(evt) {
    const currentKey = getCurrentKey(evt.code);
    this.changeKeyState(currentKey);
    this.processInput(currentKey, evt);
  }

  onKeyUp(evt) {
    const { code } = evt;
    const currentKey = getCurrentKey(code);
    this.changeKeyState(currentKey, true);
    evt.preventDefault();

    if (evt.ctrlKey && evt.altKey) {
      this.changeKeyboardLang()
    }

    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      this.changeKeyboardCase();
      this.debounce = true;
    }


  }

  init() {
    this.createKeyboard();
    document.body.prepend(this.keyboard);



    this.preventInput();
    document.body.addEventListener('keydown', this.onKeyDown.bind(this));
    document.body.addEventListener('keyup', this.onKeyUp.bind(this));
  }
}


window.addEventListener('load', () => {
  const keyboard = new Keyboard(keyboardKeys);
  keyboard.init();
});
