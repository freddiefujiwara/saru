import Node from '../src/node';
export default class Program extends Node {
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
  /*
   * string expression
   */
  toString(){
    return this.Statements.map( s => `${s}`).join(';\n');
  }
  /*
   * @constructor
   */
  constructor(){
    super();
    this.Statements = [];
  }
}
