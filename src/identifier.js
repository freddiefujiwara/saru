import Expression from '../src/expression';
const _value = Symbol('value');
export default class Identifier extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , value = undefined){
    super(token);
    this[_value] = value;
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
   * Token literal
   */
  TokenLiteral(){
    return this.Token.Literal;
  }
}
