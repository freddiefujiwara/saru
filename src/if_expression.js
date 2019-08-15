import Expression from '../src/expression';
const _condition = Symbol('condition');
const _consequence = Symbol('consequence');
const _alternative = Symbol('alternative');
export default class IfExpression extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , condition = undefined , consequence = undefined , alternative = undefined ){
    super(token);
    this[_condition] = condition;
    this[_consequence] = consequence;
    this[_alternative] = alternative;
  }
  /*
   * getter for expression
   */
  get Condition(){
    return this[_condition];
  }
  /*
   * getter for consequence
   */
  get Consequence(){
    return this[_consequence];
  }
  /*
   * getter for alternative
   */
  get Alternative(){
    return this[_alternative];
  }
  /*
   * string expression
   */
  toString(){
    const out = `${this[_condition]} ${this[_consequence]}`;
    if(!this[_alternative]) return out;
    return`${out} else ${this[_alternative]}`;
  }
}
