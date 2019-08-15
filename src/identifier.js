import Expression from '../src/expression';
const _value = Symbol('value');
export default class Identifier extends Expression {
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
   * @constructor
   */
  constructor(token = undefined , value = undefined){
    super(token);
    this[_value] = value;
  }
}
