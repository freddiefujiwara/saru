import Statement from '../src/statement';
export default class BlockStatement extends Statement {
  /*
   * string expression
   */
  toString(){
    return this.Statements.map( s => `${s}`).join(';\n');
  }
  /*
   * @constructor
   */
  constructor(token = undefined , statements = [] ){
    super(token);
    this.Statements = statements;
  }
}
