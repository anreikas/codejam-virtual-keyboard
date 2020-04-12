import {
  keyboardKeys, specialCase, specialKeys, transformKeyValue, pairedKeys, langs, cases, prefixes,
} from './constants.js';
import {
  createElement, createMetaKey, createKey, getCurrentKey,
  changDataInStorage, getDataFromStorage, stateChanger, createInfo,
} from './utils.js';

class Keyboard {
  constructor(initialData) {
    this.keyboardKeysData = initialData;
    this.className = 'keyboard';
    this.btnPrefix = 'Key';
    this.keyboard = null;
    this.textArea = null;
    this.keyboardRows = null;
    this.defActiveCase = cases.lowercase;
    this.defActiveLang = langs.ru;
    this.activeCapsClass = 'meta-key--active-caps';
    this.mainDataAttr = 'data-key';

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
    return changDataInStorage.call(this, 'lang', this.defActiveLang, langs.en);
  }

  changeKeyboardLang() {
    stateChanger.call(this, this.changeLang, this.className, this.keyboardRows);
  }

  getCase() {
    return getDataFromStorage('case', this.defActiveCase);
  }

  changeCase() {
    return changDataInStorage('case', this.defActiveCase, cases.uppercase);
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

    rowsModificators.forEach((modificator) => {
      const rowClassWithMod = `${rowClass}${modificator}`;
      this.keyboardRows.append(createElement('DIV', '', rowClass, rowClassWithMod, activeLang, activeCase));
    });
  }

  getKeyAttr(arrOfSymbols, arr, pos) {
    let firstSymbol = arrOfSymbols[0];
    const lastSymbol = arrOfSymbols[arrOfSymbols.length - 1];
    const specialAttrValue = specialCase[firstSymbol];

    if (specialAttrValue) {
      return specialAttrValue;
    }

    if (arrOfSymbols.length === 1) {
      if (pairedKeys[firstSymbol]) {
        const mid = Math.floor(arr.length / 2);
        const prefix = (pos < mid) ? prefixes.left : prefixes.right;
        if (firstSymbol === pairedKeys.Ctrl) {
          firstSymbol = transformKeyValue[firstSymbol];
        }
        if (firstSymbol === specialKeys.Win) {
          firstSymbol = transformKeyValue[firstSymbol];
        }
        return `${firstSymbol}${prefix}`;
      }

      return `${firstSymbol}`;
    }
    return `${this.btnPrefix}${lastSymbol}`;
  }

  createAndFillRows() {
    const lang = this.getLang();
    const keyCase = this.getCase();
    this.createRows(lang, keyCase);

    this.keyboardKeysData.forEach((rowData, index) => {
      const row = this.keyboardRows.children[index];
      rowData.forEach((symbols, pos) => {
        const attrVal = this.getKeyAttr(symbols, rowData, pos);
        if (symbols.length === 1) {
          row.append(createMetaKey(symbols[0], attrVal));
        } else {
          row.append(createKey(symbols, attrVal));
        }
      });
    });
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
    }
    if (isKey && flag) {
      currentKey.classList.remove(keyActiveClass);
    }
    if (isMetaKey && !flag) {
      currentKey.classList.add(metaKeyActiveClass);
    }
    if (isKey && !flag) {
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

    if (code === specialKeys.Delete) {
      this.textArea.value = `${text.slice(0, this.startPos)}${text.slice(this.startPos + 1)}`;
      this.textArea.selectionEnd = this.startPos;
      return true;
    }
    if (this.startPos <= 0) {
      return false;
    }
    if (code === specialKeys.Backspace && text.length === this.startPos && this.focus) {
      this.textArea.value = `${text.slice(0, text.length - 1)}`;
      this.setCaretPosition();
      return true;
    }
    if (code === specialKeys.Backspace) {
      this.textArea.value = `${text.slice(0, this.startPos - 1)}${text.slice(this.startPos)}`;
      this.setCaretPosition();
      return true;
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
    } else if (code === specialKeys.Tab) {
      this.insertSymbol('\t');
    } else if (code === specialKeys.Delete && this.focus) {
      this.removeSymbol(code);
    } else if (code === specialKeys.Backspace) {
      this.removeSymbol(code);
    } else if (code === specialKeys.Space) {
      this.insertSymbol(' ');
    } else if (code === specialKeys.Enter) {
      this.insertSymbol('\n');
    } else if (code.includes(pairedKeys.Shift) && this.debounce) {
      this.changeKeyboardCase();
      this.debounce = false;
    } else if (evt && evt.ctrlKey && evt && evt.altKey) {
      this.changeKeyboardLang();
    } else if (code === specialKeys.CapsLock) {
      document.body.querySelector(`[${this.mainDataAttr}="${code}"]`).classList.toggle(this.activeCapsClass);
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

    if (evt.code.includes(pairedKeys.Shift)) {
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

    const keyValAttr = key.getAttribute(this.mainDataAttr);
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
    const capsLockBtn = document.querySelector(`[${this.mainDataAttr}="${specialKeys.CapsLock}"]`);
    const caseState = this.getCase();

    if (caseState === cases.uppercase) {
      capsLockBtn.classList.add(this.activeCapsClass);
    }

    if (caseState === cases.lowercase) {
      capsLockBtn.classList.remove(this.activeCapsClass);
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
