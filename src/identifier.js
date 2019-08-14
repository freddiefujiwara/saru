import Expression from '../src/expression';
const _token = Symbol('token');
const _value = Symbol('value');
export default class Identifier extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , value = undefined){
    super();
    this[_token] = token;
    this[_value] = value;
  }
  /*
   * getter for token
   */
  get Token(){
    return this[_token];
  }
  /*
   * getter for value
   */
  get Value(){
    return this[_value];
  }
  /*
   * string expression
   */
  toString(){
    return `${this[_value]}`;
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
    return this[_token].Literal;
  }
}
