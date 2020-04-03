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


class Keyboard {
  constructor(data) {
    this.data = data;
    this.className = 'keyboard';
    this.btnClass = 'key';
    this.keyboard = null;
    this.textArea = null;
    this.keyboardRows = null;

    this.keyboardSurfaceClass = `${this.className}__surface`;
    this.textAreaClass = `${this.className}__input`;
    this.wrapperClass = `${this.className}__wrapper`;
  }


  createRows() {
    this.keyboardRows = document.createDocumentFragment();
    const rowsModificators = ['--first', '--second', '--third', '--fourth', '--fifth'];
    const rowClass = `${this.className}-row`;

    for (let i = 0; i < rowsModificators.length; i += 1) {
      const rowClassWithMod = `${rowClass}${rowsModificators[i]}`;
      this.keyboardRows.append(createElement('DIV', '', rowClass, rowClassWithMod));
    }
  }

  getModificator(arrOfSymbols, arr, pos) {
    const [firstSymbol, , , lastSymbol] = arrOfSymbols;
    const specialModificator = specialCase[firstSymbol];

    if (specialModificator) {
      return `${this.btnClass}--${specialModificator}`;
    }

    if (arrOfSymbols.length === 1) {
      if (firstSymbol === 'Shift' || firstSymbol === 'Alt' || firstSymbol === 'Alt') {
        const mid = Math.floor(arr.length / 2);
        const prefix = (pos < mid) ? 'Left' : 'Right';
        return `${this.btnClass}--${prefix}${firstSymbol}`;
      }
      return `${this.btnClass}--${firstSymbol}`;
    }
    return `${this.btnClass}--${lastSymbol}`;
  }

  createAndfillRows() {
    this.createRows();

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
    this.createAndfillRows();
    const keyboardSurface = createElement('DIV', this.keyboardRows, this.keyboardSurfaceClass);
    const textArea = createElement('TEXTAREA', '', this.textAreaClass);
    const wrapper = createElement('DIV', '', this.wrapperClass);
    keyboardSurface.append(this.keyboardRows);
    wrapper.append(textArea, keyboardSurface);

    return createElement('DIV', wrapper, this.className);
  }

  init() {
    const keyboard = this.createKeyboard();
    document.body.prepend(keyboard);
  }
}


window.addEventListener('load', () => {
  const keyboard = new Keyboard(keyboardKeys);
  keyboard.init();
});
