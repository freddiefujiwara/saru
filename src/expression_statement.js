import Statement from '../src/statement';
const _expression = Symbol('expression');
export default class ExpressionStatement extends Statement {
  /*
   * getter for expression
   */
  get Expression(){
    return this[_expression];
  }
  /*
   * string expression
   */
  toString(){
    return `${this[_expression]}`;
  }
  /*
   * @constructor
   */
  constructor(token = undefined , expression = undefined){
    super(token);
    this[_expression] = expression;
  }
}
