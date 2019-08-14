import Node from '../src/node';
export default class Program extends Node {
  /*
   * @constructor
   */
  constructor(){
    super();
    this.Statements = [];
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    if(0 < this.Statements.length
      && typeof this.Statements[0].TokenLiteral === 'function'){
      return this.Statements[0].TokenLiteral();
    }
    return '';
  }
}
