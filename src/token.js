export default class Token {
  /*
   * @constructor
   */
  constructor(type , literal){
    this.type = type;
    this.literal = literal;
  }
  static LookupIdent(ident){
    if (Token.KEYWORDS[ident]){
      return Token.KEYWORDS[ident];
    }
    return Token.TOKEN_TYPE.IDENT;
  }
  static get TOKEN_TYPE(){
    return {
      'ILLEGAL': 'ILLEGAL',
      'EOF': 'EOF',
      'COMMENT': 'COMMENT',

      // Identifiers + literals
      'IDENT': 'IDENT', // add, foobar, x, y, ...
      'INT': 'INT', // 123456
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
    };
  }
  static get KEYWORDS(){
    return {
      'as': Token.TOKEN_TYPE.AS,
      'import': Token.TOKEN_TYPE.IMPORT,
      'fn': Token.TOKEN_TYPE.FUNCTION,
      'while': Token.TOKEN_TYPE.WHILE,
      'for': Token.TOKEN_TYPE.FOR,
      'let': Token.TOKEN_TYPE.LET,
      'true': Token.TOKEN_TYPE.TRUE,
      'false': Token.TOKEN_TYPE.FALSE,
      'if': Token.TOKEN_TYPE.IF,
      'else': Token.TOKEN_TYPE.ELSE,
      'return': Token.TOKEN_TYPE.RETURN,
      'and': Token.TOKEN_TYPE.LAND,
      'or': Token.TOKEN_TYPE.LOR
    };
  }
}
