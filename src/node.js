const _token = Symbol('token');
export default class Node {
  /*
   * getter for token
   */
  get Token(){
    return this[_token];
  }
  /*
   * string expression
   * console.log(node) # -> "Node {}"
   */
  toString(){
    return 'Node {}';
  }
  /*
   * Token literal
   */
  TokenLiteral(){
    if(!this[_token]) return;
    return this[_token].Literal;
  }
  /*
   * @constructor
   */
  constructor(token = undefined){
    this[_token] = token;
  }
}
