import Statement from '../src/statement';
const _token = Symbol('token');
const _returnValue = Symbol('returnValue');
export default class ReturnStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , returnValue = undefined){
    super();
    this[_token] = token;
    this[_returnValue] = returnValue;
  }
  /*
   * getter for token
   */
  get Token(){
    return this[_token];
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
    return this[_token].Literal;
  }
}
