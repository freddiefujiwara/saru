import Statement from '../src/statement';
const _name = Symbol('name');
const _value = Symbol('value');
export default class LetStatement extends Statement {
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
   * @constructor
   */
  constructor(token = undefined , name = undefined , value = undefined){
    super(token);
    this[_name] = name;
    this[_value] = value;
  }
}
