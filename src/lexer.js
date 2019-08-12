import Token from './token';
export default class Lexer {
  /*
   * @constructor
   * param {string} input
   */
  constructor(input){
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = undefined;
    this.readChar();
  }
  /*
   * read current position
   */
  readChar(){
    this.ch = this.peekChar();
    this.position = this.readPosition;
    this.readPosition++;
  }
  /*
   * peek current position
   */
  peekChar(){
    if (this.readPosition >= this.input.length) {
      return 0;
    }
    return this.input.charAt(this.readPosition);
  }
  /*
   * read identifier
   */
  readIdentifier(){
    const position = this.position;
    while (Lexer.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  /*
   * read number
   */
  readNumber(){
    const position = this.position;
    while (Lexer.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  /*
   * read string
   */
  readString(type = '"'){
    const position = this.position + 1;
    this.readChar();
    while (this.ch !== type && 0 !== this.ch) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  /*
   * read comment
   */
  readComment() {
    const position = this.position + 1;
    this.readChar();
    while ('\n' !== this.ch && '\r' !== this.ch && 0 !== this.ch) {
      this.readChar();
    }
    return this.input.slice(position, this.position).trim();
  }
  /*
   * skip white spaces
   */
  skipWhitespace(){
    while (-1 !== ' \t\n\r'.indexOf(this.ch)){
      this.readChar();
    }
  }
  /*
   * read NextToken
   */
  NextToken(){
    let tok;
    this.skipWhitespace();
    switch(this.ch){
    case '=':
      if('=' === this.peekChar()){
        this.readChar();
        tok = new Token(Token.TOKEN_TYPE.EQ, '==');
      } else {
        tok = new Token(Token.TOKEN_TYPE.ASSIGN, this.ch);
      }
      break;
    case '+':
      tok = new Token(Token.TOKEN_TYPE.PLUS, this.ch);
      break;
    case '-':
      tok = new Token(Token.TOKEN_TYPE.MINUS, this.ch);
      break;
    case '!':
      if('=' === this.peekChar()){
        this.readChar();
        tok = new Token(Token.TOKEN_TYPE.NOT_EQ, '!=');
      } else {
        tok = new Token(Token.TOKEN_TYPE.BANG, this.ch);
      }
      break;
    case '/':
      tok = new Token(Token.TOKEN_TYPE.SLASH, this.ch);
      break;
    case '#':
      tok = new Token(Token.TOKEN_TYPE.COMMENT, this.readComment());
      break;
    case '*':
      tok = new Token(Token.TOKEN_TYPE.ASTERISK, this.ch);
      break;
    case '%':
      tok = new Token(Token.TOKEN_TYPE.REM, this.ch);
      break;
    case '&':
      tok = new Token(Token.TOKEN_TYPE.BIT_AND, this.ch);
      break;
    case '|':
      tok = new Token(Token.TOKEN_TYPE.BIT_OR, this.ch);
      break;
    case '.':
      tok = new Token(Token.TOKEN_TYPE.PERIOD, this.ch);
      break;
    case '^':
      tok = new Token(Token.TOKEN_TYPE.BIT_XOR, this.ch);
      break;
    case '~':
      tok = new Token(Token.TOKEN_TYPE.BIT_NOT, this.ch);
      break;
    case '<':
      tok = new Token(Token.TOKEN_TYPE.LT, this.ch);
      break;
    case '>':
      tok = new Token(Token.TOKEN_TYPE.GT, this.ch);
      break;
    case ';':
      tok = new Token(Token.TOKEN_TYPE.SEMICOLON, this.ch);
      break;
    case ',':
      tok = new Token(Token.TOKEN_TYPE.COMMA, this.ch);
      break;
    case '{':
      tok = new Token(Token.TOKEN_TYPE.LBRACE, this.ch);
      break;
    case '}':
      tok = new Token(Token.TOKEN_TYPE.RBRACE, this.ch);
      break;
    case '(':
      tok = new Token(Token.TOKEN_TYPE.LPAREN, this.ch);
      break;
    case ')':
      tok = new Token(Token.TOKEN_TYPE.RPAREN, this.ch);
      break;
    case '[':
      tok = new Token(Token.TOKEN_TYPE.LBRACKET, this.ch);
      break;
    case ']':
      tok = new Token(Token.TOKEN_TYPE.RBRACKET, this.ch);
      break;
    case '"':
      tok = new Token(Token.TOKEN_TYPE.STRING, this.readString());
      break;
    case '\'':
      tok = new Token(Token.TOKEN_TYPE.STRING, this.readString('\''));
      break;
    case ':':
      tok = new Token(Token.TOKEN_TYPE.COLON, this.ch);
      break;
    case 0:
      tok = new Token(Token.TOKEN_TYPE.EOF, '');
      break;
    default:
      if(Lexer.isLetter(this.ch)){
        const identifier = this.readIdentifier();
        return new Token(Token.LookupIdent(identifier),identifier);
      }
      if(Lexer.isDigit(this.ch)){
        return new Token(Token.TOKEN_TYPE.INT,this.readNumber());
      }
      tok = new Token(Token.TOKEN_TYPE.ILLEGAL,this.ch);
    }
    this.readChar();
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

