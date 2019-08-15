import Expression from '../src/expression';
const _operator = Symbol('operator');
const _right = Symbol('right');
export default class PrefixExpression extends Expression {
  /*
   * getter for operator
   */
  get Operator(){
    return this[_operator];
  }
  /*
   * getter for right
   */
  get Right(){
    return this[_right];
  }
  /*
   * string expression
   */
  toString(){
    return `(${this[_operator]}${this[_right]})`;
  }
  /*
   * @constructor
   */
  constructor(token = undefined , operator = undefined , right = undefined){
    super(token);
    this[_operator] = operator;
    this[_right] = right;
  }
}
