import Expression from '../src/expression';
const _operator = Symbol('operator');
const _left = Symbol('left');
const _right = Symbol('right');
export default class InfixExpression extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , left = undefined , operator = undefined , right = undefined){
    super(token);
    this[_left] = left;
    this[_operator] = operator;
    this[_right] = right;
  }
  /*
   * getter for left
   */
  get Left(){
    return this[_left];
  }
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
    return `(${this[_left]} ${this[_operator]} ${this[_right] ? this[_right] : ''})`;
  }
}
