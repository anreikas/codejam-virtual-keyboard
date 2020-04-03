const keybordKeys = [
  [
    ['ё', 'Ё', '`', '~'], ['1', '!', '1', '!'], ['2', '\x22', '2', '@'],
    ['3', '№', '3', '#'], ['4', ';', '4', '$'], ['5', '%', '5', '%'],
    ['6', ':', '6', '^'], ['7', '?', '7', '&'], ['8', '*', '8', '*'],
    ['9', '(', '9', '('], ['0', ')', '0', ')'], ['-', '_', '-', '_'],
    ['=', '+', '=', '+'], ['Backspace']
  ],
  [
    ['Tab'], ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'],
    ['к', 'К', 'r', 'R'], ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'],
    ['ш', 'Ш', 'i', 'I'], ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'],
    ['х', 'Х', '[', '{'], ['ъ', 'Ъ', ']', '}'], ['\x5c', '/', '\x5c', '|'], ['Del']
  ],

  [
    ['CapsLock'], ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'],
    ['в', 'В', 'd', 'D'], ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'],
    ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'], ['л', 'Л', 'k', 'K'],
    ['д', 'Д', 'l', 'L'], ['ж', 'Ж', ';', ':'], ['э', 'Э', '\x27', '\x22'],
    ['Enter']
  ],

  [
    ['Shift'], ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'],
    ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'],
    ['ь', 'Ь', 'm', 'M'], ['б', 'Б', '.', '<'], ['ю', 'Ю', ',', '>'],
    ['.', ',', '/', '?'], ['▲', '▲', '▲', '▲'], ['Shift']
  ],

  [
    ['Ctrl'], ['Win'], ['Alt'], ['Space'],
    ['Alt'], ['◄', '◄', '◄', '◄'], ['▼', '▼', '▼', '▼'],
    ['►', '►', '►', '►'], ['Ctrl']
  ]
];


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

  return createElement('DIV', childElem, classes, mainClass);
}


function createKeyChild(mainClass, lowSymbol, upperSymbol) {
  const lowercaseClass = `${mainClass}-lowercase`;
  const uppercaseClass = `${mainClass}-uppercase`;
  const elementWithLow = createElement('DIV', lowSymbol, lowercaseClass)
  const elementWithUpp = createElement('DIV', upperSymbol, uppercaseClass)
  const fragment = document.createDocumentFragment();
  fragment.append(elementWithLow, elementWithUpp);

  return createElement('DIV', fragment, mainClass);
}

function createKey(symbols) {
  const [rusLow, rusUpp, enLow, enUpp] = symbols;
  const mainClass = 'key';
  const ruLangClass = `${mainClass}__ru`;
  const enLangClass = `${mainClass}__en`;
  const ruSymbols = createKeyChild(ruLangClass, rusLow, rusUpp);
  const enSymbols = createKeyChild(enLangClass, enLow, enUpp);
  const fragment = document.createDocumentFragment();
  fragment.append(ruSymbols, enSymbols);

  return createElement('DIV', fragment, mainClass);
}

