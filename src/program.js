import Node from '../src/node';
import Statement from '../src/statement';
export default class Program extends Node {
  /*
   * @constructor
   */
  constructor(){
    super();
    this.statements = [];
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    if(0 < this.statements.length && typeof this.statements[0].TokenLiteral === 'function'){
      return this.statements[0].TokenLiteral();
    }
    return "";
  }
}
