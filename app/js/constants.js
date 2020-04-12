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

const transformKeyValue = {
  Ctrl: 'Control',
  Win: 'Meta',
};

const pairedKeys = {
  Alt: 'Alt',
  Ctrl: 'Ctrl',
  Shift: 'Shift',
};

const specialKeys = {
  Tab: 'Tab',
  Delete: 'Delete',
  Backspace: 'Backspace',
  Space: 'Space',
  Enter: 'Enter',
  CapsLock: 'CapsLock',
  Win: 'Win',
};

const langs = {
  en: 'en',
  ru: 'ru',
};

const cases = {
  lowercase: 'lowercase',
  uppercase: 'uppercase',
};

const prefixes = {
  left: 'Left',
  right: 'Right',
};

export {
  keyboardKeys, specialCase, specialKeys, transformKeyValue, pairedKeys, langs, cases, prefixes,
};
