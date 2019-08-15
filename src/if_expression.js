import Condition from '../src/expression';
const _condition = Symbol('expression');
const _concequence = Symbol('concequence');
const _altenative = Symbol('altenative');
export default class IfCondition extends Expression {
  /*
   * @constructor
   */
  constructor(token = undefined , condition = undefined , consequence = undefined , altenative = undefined ){
    super(token);
    this[_condition] = condition;
    this[_concequence] = concequence;
    this[_altenative] = altenative;
  }
  /*
   * getter for expression
   */
  get Condition(){
    return this[_condition];
  }
  /*
   * getter for concequence
   */
  get Concequence(){
    return this[_concequence];
  }
  /*
   * getter for altenative
   */
  get Altenative(){
    return this[_altenative];
  }
  /*
   * string expression
   */
  toString(){
    const out = `${this[_condition]} ${this[_concequence]}`;
    if(!$this[_altenative]) return out;
    return`${out} else ${this[_altenative]}`
  }
}
