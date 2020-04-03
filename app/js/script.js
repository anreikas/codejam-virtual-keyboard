'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var keybordKeys = [[['ё', 'Ё', '`', '~'], ['1', '!', '1', '!'], ['2', '\x22', '2', '@'], ['3', '№', '3', '#'], ['4', ';', '4', '$'], ['5', '%', '5', '%'], ['6', ':', '6', '^'], ['7', '?', '7', '&'], ['8', '*', '8', '*'], ['9', '(', '9', '('], ['0', ')', '0', ')'], ['-', '_', '-', '_'], ['=', '+', '=', '+'], ['Backspace']], [['Tab'], ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'], ['к', 'К', 'r', 'R'], ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'], ['ш', 'Ш', 'i', 'I'], ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'], ['х', 'Х', '[', '{'], ['ъ', 'Ъ', ']', '}'], ['\x5c', '/', '\x5c', '|'], ['Del']], [['CapsLock'], ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'], ['в', 'В', 'd', 'D'], ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'], ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'], ['л', 'Л', 'k', 'K'], ['д', 'Д', 'l', 'L'], ['ж', 'Ж', ';', ':'], ['э', 'Э', '\x27', '\x22'], ['Enter']], [['Shift'], ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'], ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'], ['ь', 'Ь', 'm', 'M'], ['б', 'Б', '.', '<'], ['ю', 'Ю', ',', '>'], ['.', ',', '/', '?'], ['▲', '▲', '▲', '▲'], ['Shift']], [['Ctrl'], ['Win'], ['Alt'], ['Space'], ['Alt'], ['◄', '◄', '◄', '◄'], ['▼', '▼', '▼', '▼'], ['►', '►', '►', '►'], ['Ctrl']]];

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

function createMetaKey(content) {
  var mainClass = 'meta-key';
  var elemClass = mainClass + '__label';
  var childElem = createElement('DIV', content, elemClass);

  for (var _len2 = arguments.length, classes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classes[_key2 - 1] = arguments[_key2];
  }

  return createElement('DIV', childElem, classes, mainClass);
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

function createKey(symbols) {
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

  return createElement('DIV', fragment, mainClass);
}