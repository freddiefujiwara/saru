import Statement from '../src/statement';
const _returnValue = Symbol('returnValue');
export default class ReturnStatement extends Statement {
  /*
   * getter for returnValue
   */
  get ReturnValue(){
    return this[_returnValue];
  }
  /*
   * string expression
   */
  toString(){
    return `${this.TokenLiteral()} ${undefined === this[_returnValue] ? '' : this[_returnValue]}`;
  }
  /*
   * @constructor
   */
  constructor(token = undefined , returnValue = undefined){
    super(token);
    this[_returnValue] = returnValue;
  }
}
