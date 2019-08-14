import Statement from '../src/statement';
const _token = Symbol('token');
const _name = Symbol('name');
const _value = Symbol('value');
export default class LetStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , name = undefined , value = undefined){
    super();
    this[_token] = token;
    this[_name] = name;
    this[_value] = value;
  }
  /*
   * getter for token
   */
  get Token(){
    return this[_token];
  }
  /*
   * getter for name
   */
  get Name(){
    return this[_name];
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
    return `${this.TokenLiteral()} ${this[_name]} = ${this[_value]}`;
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    return this[_token].Literal;
  }
}
