import Statement from '../src/statement';
const _token = Symbol('token');
const _expression = Symbol('expression');
export default class ExpressionStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , expression = undefined){
    super();
    this[_token] = token;
    this[_expression] = expression;
  }
  /*
   * getter for token
   */
  get Token(){
    return this[_token];
  }
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
   * Token literal
   */
  TokenLiteral(){
    return this[_token].Literal;
  }
}
