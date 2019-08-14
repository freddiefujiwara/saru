import Expression from '../src/expression';
export default class Identifier extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , value = undefined){
    super();
    this.token = token;
    this.value = value;
  }
  /*
   * string expression
   */
  toString(){
    return `${this.value}`;
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
    return this.token.Literal;
  }
}
