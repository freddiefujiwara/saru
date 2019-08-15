import Expression from '../src/expression';
const _value = Symbol('value');
export default class BooleanLiteral extends Expression {
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
    return `${this.Token.Literal}`;
  }
  /*
   * @constructor
   */
  constructor(token = undefined , value = undefined){
    super(token);
    this[_value] = value;
  }
}
