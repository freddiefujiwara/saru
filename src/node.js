const _token = Symbol('token');
export default class Node {
  /*
   * @constructor
   */
  constructor(token = undefined){
    this[_token] = token;
  }
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
  }
}
