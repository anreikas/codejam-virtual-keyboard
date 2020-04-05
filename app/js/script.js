'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyboardKeys = [[['ё', 'Ё', '`', '~'], ['1', '!', '1', '!'], ['2', '\x22', '2', '@'], ['3', '№', '3', '#'], ['4', ';', '4', '$'], ['5', '%', '5', '%'], ['6', ':', '6', '^'], ['7', '?', '7', '&'], ['8', '*', '8', '*'], ['9', '(', '9', '('], ['0', ')', '0', ')'], ['-', '_', '-', '_'], ['=', '+', '=', '+'], ['Backspace']], [['Tab'], ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'], ['к', 'К', 'r', 'R'], ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'], ['ш', 'Ш', 'i', 'I'], ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'], ['х', 'Х', '[', '{'], ['ъ', 'Ъ', ']', '}'], ['\x5c', '/', '\x5c', '|'], ['Del']], [['CapsLock'], ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'], ['в', 'В', 'd', 'D'], ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'], ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'], ['л', 'Л', 'k', 'K'], ['д', 'Д', 'l', 'L'], ['ж', 'Ж', ';', ':'], ['э', 'Э', '\x27', '\x22'], ['Enter']], [['Shift'], ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'], ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'], ['ь', 'Ь', 'm', 'M'], ['б', 'Б', '.', '<'], ['ю', 'Ю', ',', '>'], ['.', ',', '/', '?'], ['▲', '▲', '▲', '▲'], ['Shift']], [['Ctrl'], ['Win'], ['Alt'], ['Space'], ['Alt'], ['◄', '◄', '◄', '◄'], ['▼', '▼', '▼', '▼'], ['►', '►', '►', '►'], ['Ctrl']]];

var specialCase = {
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
  Del: 'Delete'
};

function createElement(tagName, content) {
  var _element$classList;

  var element = document.createElement(tagName);

  for (var _len = arguments.length, classes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classes[_key - 2] = arguments[_key];
  }

  (_element$classList = element.classList).add.apply(_element$classList, classes);
  element.append(content);

  return element;
}

function createMetaKey(content, attr) {
  var mainClass = 'meta-key';
  var elemClass = mainClass + '__label';
  var childElem = createElement('DIV', content, elemClass);
  var metaKey = createElement('DIV', childElem, mainClass);
  metaKey.setAttribute('data-key', attr);

  return metaKey;
}

function createKeyChild(mainClass, lowSymbol, upperSymbol) {
  var lowercaseClass = mainClass + '-lowercase';
  var uppercaseClass = mainClass + '-uppercase';
  var elementWithLow = createElement('DIV', lowSymbol, lowercaseClass);
  var elementWithUpp = createElement('DIV', upperSymbol, uppercaseClass);
  var fragment = document.createDocumentFragment();
  fragment.append(elementWithLow, elementWithUpp);

  return createElement('DIV', fragment, mainClass);
}

function createKey(symbols, attr) {
  var _symbols = _slicedToArray(symbols, 4),
      rusLow = _symbols[0],
      rusUpp = _symbols[1],
      enLow = _symbols[2],
      enUpp = _symbols[3];

  var mainClass = 'key';
  var ruLangClass = mainClass + '__ru';
  var enLangClass = mainClass + '__en';
  var ruSymbols = createKeyChild(ruLangClass, rusLow, rusUpp);
  var enSymbols = createKeyChild(enLangClass, enLow, enUpp);
  var fragment = document.createDocumentFragment();
  fragment.append(ruSymbols, enSymbols);
  var key = createElement('DIV', fragment, mainClass);
  key.setAttribute('data-key', attr);

  return key;
}

function getCurrentKey(keyCode) {
  // const code = `${keyCode[0].toLowerCase()}${keyCode.slice(1)}`;
  return document.body.querySelector('[data-key="' + keyCode + '"]');
}

function getDataFromStorage(item, defValue) {
  if (localStorage.getItem(item)) {
    return localStorage.getItem(item);
  }

  localStorage.setItem(item, defValue);
  return defValue;
}

function changDataInStorage(item, defValue, newVal) {
  var oldVal = localStorage.getItem(item);
  var currentVal = oldVal === defValue ? newVal : defValue;
  localStorage.setItem(item, currentVal);

  return {
    oldVal: oldVal,
    currentVal: currentVal
  };
}

function stateChanger(cb, className, where) {
  var _cb$call = cb.call(this),
      oldVal = _cb$call.oldVal,
      currentVal = _cb$call.currentVal;

  var currentLangClass = className + '--' + currentVal;
  var oldLangClass = className + '--' + oldVal;

  for (var i = 0; i < where.length; i += 1) {
    var element = where[i];
    element.classList.remove(oldLangClass);
    element.classList.add(currentLangClass);
  }
}

var Keyboard = function () {
  function Keyboard(data) {
    _classCallCheck(this, Keyboard);

    this.data = data;
    this.className = 'keyboard';
    this.btnPrefix = 'Key';
    this.keyboard = null;
    this.textArea = null;
    this.keyboardRows = null;
    this.defActiveCase = 'lowercase';
    this.defActiveLang = 'ru';

    this.keyboardSurfaceClass = this.className + '__surface';
    this.textAreaClass = this.className + '__input';
    this.wrapperClass = this.className + '__wrapper';
    this.metaKeyClass = 'meta-key';
    this.keyClass = 'key';
    this.debounce = true;
    this.startPosition = null;
  }

  _createClass(Keyboard, [{
    key: 'preventInput',
    value: function preventInput() {
      function onTextAreaInput() {
        this.textArea.value = this.textArea.value.slice(0, this.textArea.length - 1);
      }

      function onKeyDown(e) {
        if (e.code === 'Backspace') {
          e.preventDefault();
        }

        this.textArea.selectionStart = 0;
        this.textArea.selectionEnd = 0;
      }

      function onKeyUp(e) {
        this.startPosition += 1;
        e.preventDefault();
      }

      function onBlur(e) {
        this.startPosition += 1;
        e.preventDefault();
      }

      this.textArea.addEventListener('input', onTextAreaInput.bind(this));
      this.textArea.addEventListener('keydown', onKeyDown.bind(this));
      this.textArea.addEventListener('keyup', onKeyUp.bind(this));
      this.textArea.addEventListener('blur', onBlur.bind(this));
    }
  }, {
    key: 'getLang',
    value: function getLang() {
      return getDataFromStorage.call(this, 'lang', this.defActiveLang);
    }
  }, {
    key: 'changeLang',
    value: function changeLang() {
      return changDataInStorage.call(this, 'lang', this.defActiveLang, 'en');
    }
  }, {
    key: 'changeKeyboardLang',
    value: function changeKeyboardLang() {
      stateChanger.call(this, this.changeLang, this.className, this.keyboardRows);
    }
  }, {
    key: 'getCase',
    value: function getCase() {
      return getDataFromStorage('case', this.defActiveCase);
    }
  }, {
    key: 'changeCase',
    value: function changeCase() {
      return changDataInStorage('case', this.defActiveCase, 'uppercase');
    }
  }, {
    key: 'changeKeyboardCase',
    value: function changeKeyboardCase() {
      stateChanger.call(this, this.changeCase, this.className, this.keyboardRows);
    }
  }, {
    key: 'createRows',
    value: function createRows(lang, keyCase) {
      this.keyboardRows = document.createDocumentFragment();
      var rowsModificators = ['--first', '--second', '--third', '--fourth', '--fifth'];
      var rowClass = this.className + '-row';
      var activeLang = this.className + '--' + lang;
      var activeCase = this.className + '--' + keyCase;

      for (var i = 0; i < rowsModificators.length; i += 1) {
        var rowClassWithMod = '' + rowClass + rowsModificators[i];
        this.keyboardRows.append(createElement('DIV', '', rowClass, rowClassWithMod, activeLang, activeCase));
      }
    }
  }, {
    key: 'getKeyAttr',
    value: function getKeyAttr(arrOfSymbols, arr, pos) {
      // debugger;
      var firstSymbol = arrOfSymbols[0];
      var lastSymbol = arrOfSymbols[arrOfSymbols.length - 1];
      var specialAttrValue = specialCase[firstSymbol];

      if (specialAttrValue) {
        return specialAttrValue;
      }

      if (arrOfSymbols.length === 1) {
        if (firstSymbol === 'Shift' || firstSymbol === 'Alt' || firstSymbol === 'Alt' || firstSymbol === 'Ctrl' || firstSymbol === 'Win') {
          var mid = Math.floor(arr.length / 2);
          var prefix = pos < mid ? 'Left' : 'Right';
          if (firstSymbol === 'Ctrl') {
            firstSymbol = 'Control';
          }
          if (firstSymbol === 'Win') {
            firstSymbol = 'Meta';
          }
          return '' + firstSymbol + prefix;
        }
        if (firstSymbol === 'capslock') {
          firstSymbol = 'capsLock';
        }

        return '' + firstSymbol;
      }
      return '' + this.btnPrefix + lastSymbol;
    }
  }, {
    key: 'createAndFillRows',
    value: function createAndFillRows() {
      var lang = this.getLang();
      var keyCase = this.getCase();
      this.createRows(lang, keyCase);

      for (var i = 0; i < this.data.length; i += 1) {
        var rowData = this.data[i];
        var row = this.keyboardRows.children[i];
        for (var j = 0; j < rowData.length; j += 1) {
          var symbols = rowData[j];
          var attrVal = this.getKeyAttr(symbols, rowData, j);
          if (symbols.length === 1) {
            row.append(createMetaKey(symbols[0], attrVal));
          } else {
            row.append(createKey(symbols, attrVal));
          }
        }
      }
    }
  }, {
    key: 'createKeyboard',
    value: function createKeyboard() {
      this.createAndFillRows();
      var keyboardSurface = createElement('DIV', this.keyboardRows, this.keyboardSurfaceClass);
      keyboardSurface.append(this.keyboardRows);
      this.textArea = createElement('TEXTAREA', '', this.textAreaClass);
      var wrapper = createElement('DIV', '', this.wrapperClass);
      wrapper.append(this.textArea, keyboardSurface);
      this.keyboard = createElement('DIV', wrapper, this.className);

      // refresh link to rows
      this.keyboardRows = wrapper.querySelector('.' + this.keyboardSurfaceClass).children;
    }
  }, {
    key: 'changeKeyState',
    value: function changeKeyState(currentKey, flag) {
      var isMetaKey = currentKey.classList.contains(this.metaKeyClass);
      var isKey = currentKey.classList.contains(this.keyClass);
      var metaKeyActiveClass = this.metaKeyClass + '--active';
      var keyActiveClass = this.keyClass + '--active';

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
  }, {
    key: 'processInput',
    value: function processInput(current, code, evt) {
      var text = current.querySelector('.' + this.keyClass + '__' + this.getLang() + '-' + this.getCase());

      if (text) {
        this.textArea.value += text.textContent;
      } else if (code === 'Tab') {
        this.textArea.value += '\t';
      } else if (code === 'Delete') {} else if (code === 'Backspace') {
        this.textArea.value = this.textArea.value.slice(0, this.textArea.value.length - 1);
      } else if (code === 'Space') {
        this.textArea.value += ' ';
      } else if (code === 'Enter') {
        this.textArea.value += '\n';
      } else if (code === 'ShiftLeft' && this.debounce || code === 'ShiftRight' && this.debounce) {
        this.changeKeyboardCase();
        this.debounce = false;
      } else if (evt && evt.ctrlKey && evt && evt.altKey) {
        this.changeKeyboardLang();
      } else if (code === 'CapsLock') {
        this.changeKeyboardCase();
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(evt) {
      var currentKey = getCurrentKey(evt.code);
      this.changeKeyState(currentKey);
      this.processInput(currentKey, evt.code, evt);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(evt) {
      var currentKey = getCurrentKey(evt.code);
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
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var target = e.target;

      var key = target.closest('.meta-key') || target.closest('.key');

      if (!key) {
        return false;
      }

      var keyValAttr = key.getAttribute('data-key');
      this.changeKeyState(key);
      this.processInput(key, keyValAttr);
      return true;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      var _this = this;

      var target = e.target;

      var key = target.closest('.meta-key') || target.closest('.key');

      if (!key) {
        return false;
      }

      setTimeout(function () {
        _this.changeKeyState(key, true);
      }, 100);

      return true;
    }
  }, {
    key: 'init',
    value: function init() {
      this.createKeyboard();
      document.body.prepend(this.keyboard);
      this.preventInput();
      document.body.addEventListener('keydown', this.onKeyDown.bind(this));
      document.body.addEventListener('keyup', this.onKeyUp.bind(this));
      this.keyboard.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.keyboard.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
  }]);

  return Keyboard;
}();

window.addEventListener('load', function () {
  var keyboard = new Keyboard(keyboardKeys);
  keyboard.init();
});