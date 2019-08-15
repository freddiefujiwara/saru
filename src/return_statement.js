import Statement from '../src/statement';
const _returnValue = Symbol('returnValue');
export default class ReturnStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , returnValue = undefined){
    super(token);
    this[_returnValue] = returnValue;
  }
  /*
   * getter for returnValue
   */
  get ReturnValue(){
    return this[_returnValue];
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    return this.Token.Literal;
  }
}
