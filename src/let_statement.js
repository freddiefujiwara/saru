import Statement from '../src/statement';
export default class LetStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , name = undefined , value = undefined){
    super();
    this.token = token;
    this.name = name;
    this.value = value;
  }
  /*
   * get statementNode
   */
  statementNode(){
  }
  /*
   * string expression
   */
  toString(){
    return `${this.TokenLiteral()} ${this.name} = ${this.value}`;
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    return this.token.Literal;
  }
}
