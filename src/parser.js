export default class Parser {
  /*
   * @constructor
   * param {Lexer} lexer
   */
  constructor(lexer){
    this.lexer = lexer;
    this.curToken = undefined;
    this.peekToken = undefined;
  }
}
