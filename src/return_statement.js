import Statement from '../src/statement';
export default class ReturnStatement extends Statement {
  /*
   * @constructor
   */
  constructor(){
    super();
    this.token = undefined;
    this.name = undefined;
    this.value = undefined;
  }
  /*
   * get statementNode
   */
  statementNode(){
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    return this.token.literal;
  }
}
