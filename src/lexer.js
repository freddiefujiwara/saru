import Token from './token';
const _input = Symbol('input');
const _position = Symbol('position');
const _readPosition = Symbol('readPosition');
const _ch = Symbol('ch');
const _peekChar = Symbol('peekChar');
const _readChar = Symbol('readChar');
const _readIdentifier = Symbol('readIdentifier');
const _readNumber = Symbol('readNumber');
const _readString = Symbol('readString');
const _readComment = Symbol('readComment');
const _skipWhiteSpace = Symbol('skipWhiteSpace');
export default class Lexer {
  /*
   * @constructor
   * param {string} input
   */
  constructor(input){
    this[_input] = input;
    this[_position] = 0;
    this[_readPosition] = 0;
    this[_ch] = undefined;
    // private methods
    //   _peekChar
    this[_peekChar] = () => {
      if (this[_readPosition] >= this[_input].length) {
        return 0;
      }
      return this[_input].charAt(this[_readPosition]);
    };
    //   _readChar
    this[_readChar] = () => {
      this[_ch] = this[_peekChar]();
      this[_position] = this[_readPosition];
      this[_readPosition]++;
    };
    //   _readIdentifier
    this[_readIdentifier] = () =>{
      const position = this[_position];
      while (Lexer.isLetter(this[_ch])) {
        this[_readChar]();
      }
      return this[_input].slice(position, this[_position]);
    };
    //   _readNumber
    this[_readNumber] = () =>{
      const position = this[_position];
      while (Lexer.isDigit(this[_ch])) {
        this[_readChar]();
      }
      return this[_input].slice(position, this[_position]);
    };
    //   _readString
    this[_readString] = (type = '"') =>{
      const position = this[_position] + 1;
      this[_readChar]();
      while (this[_ch] !== type && 0 !== this[_ch]) {
        this[_readChar]();
      }
      return this[_input].slice(position, this[_position]);
    };
    //   _readComment
    this[_readComment] = () =>{
      const position = this[_position] + 1;
      this[_readChar]();
      while ('\n' !== this[_ch] && '\r' !== this[_ch] && 0 !== this[_ch]) {
        this[_readChar]();
      }
      return this[_input].slice(position, this[_position]).trim();
    };
    //   _skipWhiteSpace
    this[_skipWhiteSpace] = () =>{
      while (-1 !== ' \t\n\r'.indexOf(this[_ch])){
        this[_readChar]();
      }
    };
    this[_readChar]();
  }
  /*
   * getter for input
   */
  get Input(){
    return this[_input];
  }
  /*
   * getter for position
   */
  get Position(){
    return this[_position];
  }
  /*
   * getter for read position
   */
  get ReadPosition(){
    return this[_readPosition];
  }
  /*
   * getter for read position
   */
  get ch(){
    return this[_ch];
  }
  /*
   * read NextToken
   */
  NextToken(){
    let tok;
    this[_skipWhiteSpace]();
    switch(this[_ch]){
    case '=':
      if('=' === this[_peekChar]()){
        this[_readChar]();
        tok = new Token(Token.TOKEN_TYPE.EQ, '==');
      } else {
        tok = new Token(Token.TOKEN_TYPE.ASSIGN, this[_ch]);
      }
      break;
    case '+':
      tok = new Token(Token.TOKEN_TYPE.PLUS, this[_ch]);
      break;
    case '-':
      tok = new Token(Token.TOKEN_TYPE.MINUS, this[_ch]);
      break;
    case '!':
      if('=' === this[_peekChar]()){
        this[_readChar]();
        tok = new Token(Token.TOKEN_TYPE.NOT_EQ, '!=');
      } else {
        tok = new Token(Token.TOKEN_TYPE.BANG, this[_ch]);
      }
      break;
    case '/':
      tok = new Token(Token.TOKEN_TYPE.SLASH, this[_ch]);
      break;
    case '#':
      tok = new Token(Token.TOKEN_TYPE.COMMENT, this[_readComment]());
      break;
    case '*':
      tok = new Token(Token.TOKEN_TYPE.ASTERISK, this[_ch]);
      break;
    case '%':
      tok = new Token(Token.TOKEN_TYPE.REM, this[_ch]);
      break;
    case '&':
      tok = new Token(Token.TOKEN_TYPE.BIT_AND, this[_ch]);
      break;
    case '|':
      tok = new Token(Token.TOKEN_TYPE.BIT_OR, this[_ch]);
      break;
    case '.':
      tok = new Token(Token.TOKEN_TYPE.PERIOD, this[_ch]);
      break;
    case '^':
      tok = new Token(Token.TOKEN_TYPE.BIT_XOR, this[_ch]);
      break;
    case '~':
      tok = new Token(Token.TOKEN_TYPE.BIT_NOT, this[_ch]);
      break;
    case '<':
      tok = new Token(Token.TOKEN_TYPE.LT, this[_ch]);
      break;
    case '>':
      tok = new Token(Token.TOKEN_TYPE.GT, this[_ch]);
      break;
    case ';':
      tok = new Token(Token.TOKEN_TYPE.SEMICOLON, this[_ch]);
      break;
    case ',':
      tok = new Token(Token.TOKEN_TYPE.COMMA, this[_ch]);
      break;
    case '{':
      tok = new Token(Token.TOKEN_TYPE.LBRACE, this[_ch]);
      break;
    case '}':
      tok = new Token(Token.TOKEN_TYPE.RBRACE, this[_ch]);
      break;
    case '(':
      tok = new Token(Token.TOKEN_TYPE.LPAREN, this[_ch]);
      break;
    case ')':
      tok = new Token(Token.TOKEN_TYPE.RPAREN, this[_ch]);
      break;
    case '[':
      tok = new Token(Token.TOKEN_TYPE.LBRACKET, this[_ch]);
      break;
    case ']':
      tok = new Token(Token.TOKEN_TYPE.RBRACKET, this[_ch]);
      break;
    case '"':
      tok = new Token(Token.TOKEN_TYPE.STRING, this[_readString]());
      break;
    case '\'':
      tok = new Token(Token.TOKEN_TYPE.STRING, this[_readString]('\''));
      break;
    case ':':
      tok = new Token(Token.TOKEN_TYPE.COLON, this[_ch]);
      break;
    case 0:
      tok = new Token(Token.TOKEN_TYPE.EOF, '');
      break;
    default:
      if(Lexer.isLetter(this[_ch])){
        const identifier = this[_readIdentifier]();
        return new Token(Token.LookupIdent(identifier),identifier);
      }
      if(Lexer.isDigit(this[_ch])){
        return new Token(Token.TOKEN_TYPE.INT,this[_readNumber]());
      }
      tok = new Token(Token.TOKEN_TYPE.ILLEGAL,this[_ch]);
    }
    this[_readChar]();
    return tok;
  }
  /*
   * distinguish letter or not
   * param {string} ch
   */
  static isLetter(ch) {
    if (!ch || 1 != ch.length) return false;
    return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch === '_';
  }
  /*
   * distinguish digit or not
   * param {string} ch
   */
  static isDigit(ch) {
    if (!ch || 1 != ch.length) return false;
    return '0' <= ch && ch <= '9';
  }
}
