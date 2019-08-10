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
    if (this.readPosition >= this.input.length) {
      this.ch = 0
    }else{
      this.ch = this.input.charAt(this.readPosition);
    }
    this.position = this.readPosition;
    this.readPosition++;
  }
  /*
   * read NextToken
   */
  NextToken(){
    let tok;
    switch(this.ch){
      case '=' :
        tok = new Token(Token.TOKEN_TYPE.ASSIGN,this.ch);
        break;
      case ';' :
        tok = new Token(Token.TOKEN_TYPE.SEMICOLON,this.ch);
        break;
      case '(' :
        tok = new Token(Token.TOKEN_TYPE.LPAREN,this.ch);
        break;
      case ')' :
        tok = new Token(Token.TOKEN_TYPE.RPAREN,this.ch);
        break;
      case ',' :
        tok = new Token(Token.TOKEN_TYPE.COMMA,this.ch);
        break;
      case '+' :
        tok = new Token(Token.TOKEN_TYPE.PLUS,this.ch);
        break;
      case '{' :
        tok = new Token(Token.TOKEN_TYPE.LBRACE,this.ch);
        break;
      case '}' :
        tok = new Token(Token.TOKEN_TYPE.RBRACE,this.ch);
        break;
      case 0 :
        tok = new Token(Token.TOKEN_TYPE.EOF,"");
        break;
    }
    this.readChar();
    return tok;
  }
  /*
   * read identifier
   */
  readIdentifier(){
    let position = this.position;
    while (Lexer.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
}

/*
 * distinguish letter or not
 * param {string} ch
 */
Lexer.isLetter = (ch) => {
  if (!ch) return false;
  if (ch.length !== 1) return false;
  return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch === '_';
}
/*
 * distinguish digit or not
 * param {string} ch
 */
Lexer.isDigit = (ch) => {
  if (!ch) return false;
  if (ch.length !== 1) return false;
  return '0' <= ch && ch <= '9';
}
