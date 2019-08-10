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
}