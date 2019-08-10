export default class Token {
  /*
   * @constructor
   */
  constructor(type , literal){
    this.type = type;
    this.literal = literal;
  }
}
Token.TOKEN_TYPE = {
  'ILLEGAL': 'ILLEGAL',
  'EOF': 'EOF',
  'COMMENT': 'COMMENT',

  // Identifiers + literals
  'IDENT': 'IDENT', // add, foobar, x, y, ...
  'INT': 'INT', // 1343456
  'FLOAT': 'FLOAT', // 123.456
  'STRING': 'STRING', // "foo", "Hello, World!"

  'LBRACKET': '[', // for arrays
  'RBRACKET': ']',

  'INCREMENT': '++',
  'DECREMENT': '--',

  // Operators
  'ASSIGN': '=',
  'PLUS': '+',
  'MINUS': '-',
  'BANG': '!',
  'ASTERISK': '*',
  'EXPONENT': '**',
  'SLASH': '/',
  'REM': '%',
  'LT': '<',
  'GT': '>',
  'LTE': '<=',
  'GTE': '>=',
  'EQ': '==',
  'NOT_EQ': '!=',
  'RANGE': '..',
  'RANGE_INCL': '...',

  // Bitwise
  'BIT_AND': '&',
  'BIT_OR': '|',
  'BIT_XOR': '^',
  'BIT_NOT': '~',
  'BIT_LSHIFT': '<<',
  'BIT_RSHIFT': '>>',
  'BIT_ZRSHIFT': '>>>',

  // Delimiters
  'COMMA': ',',
  'PERIOD': '.',
  'COLON': ':',
  'SEMICOLON': ';',
  'LPAREN': '(',
  'RPAREN': ')',
  'LBRACE': '{',
  'RBRACE': '}',

  // Keywords
  'LAND': 'AND',
  'LOR': 'OR',
  'AS': 'AS',
  'IMPORT': 'IMPORT',
  'FUNCTION': 'FUNCTION',
  'WHILE': 'WHILE',
  'FOR': 'FOR',
  'LET': 'LET',
  'TRUE': 'TRUE',
  'FALSE': 'FALSE',
  'IF': 'IF',
  'ELSE': 'ELSE',
  'RETURN': 'RETURN'
}
