import Statement from '../src/statement';
const _parameters = Symbol('parameters');
const _body = Symbol('body');
export default class FunctionLiteral extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , parameters = [] , body = undefined ){
    super(token);
    this[_parameters] = parameters;
    this[_body] = body;
  }
  /*
   * string expression
   */
  toString(){
    const params =  this[_parameters].map( s => `${s}`).join(', ');
    return `${this.TokenLiteral()}(${params}) ${this[_body]}`;
  }
}
