import Statement from '../src/statement';
export default class BlockStatement extends Statement {
  /*
   * @constructor
   */
  constructor(token = undefined , statements = [] ){
    super(token);
    this.Statements = statements;
  }
  /*
   * string expression
   */
  toString(){
    return this.Statements.map( s => `${s}`).join(';\n');
  }
}
