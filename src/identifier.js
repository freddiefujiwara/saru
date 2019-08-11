import Expression from '../src/expression';
export default class Identifier extends Expression {
  /*
   * @constructor
   */
  constructor(){
    super();
    this.token = undefined;
    this.value = undefined;
  }
  /*
   * get expressionNode
   */
  expressionNode(){
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    return this.token.literal;
  }
}
