import Program from '../src/program';
export default class Parser {
  /*
   * @constructor
   * param {Lexer} lexer
   */
  constructor(lexer){
    this.lexer = lexer;
    this.nextToken();
    this.nextToken();
  }
  /*
   * read and set for both of cur and peek
   */
  nextToken(){
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.NextToken();
  }
  /*
   * parse and return the program
   */
  ParseProgram(){
    return undefined;
  }
}
