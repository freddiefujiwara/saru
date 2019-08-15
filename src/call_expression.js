import Expression from '../src/expression';
const _func = Symbol('func');
const _args = Symbol('args');
export default class CallExpression extends Expression {
  /*
   * getter for expression
   */
  get Function(){
    return this[_func];
  }
  /*
   * getter for args
   */
  get Arguments(){
    return this[_args];
  }
  /*
   * string expression
   */
  toString(){
    const args =  this[_args].map( s => `${s}`).join(', ');
    return `${this[_func]}(${args})`;
  }
  /*
   * @constructor
   */
  constructor(token = undefined , func = undefined , args = []){
    super(token);
    this[_func] = func;
    this[_args] = args;
  }
}
