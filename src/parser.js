import BlockStatement from '../src/block_statement';
import BooleanLiteral from '../src/boolean_literal';
import CallExpression from '../src/call_expression';
import ExpressionStatement from '../src/expression_statement';
import FunctionLiteral from '../src/function_literal';
import Identifier from '../src/identifier';
import IfExpression from '../src/if_expression';
import InfixExpression from '../src/infix_expression';
import IntegerLiteral from '../src/integer_literal';
import LetStatement from '../src/let_statement';
import PrefixExpression from '../src/prefix_expression';
import Program from '../src/program';
import ReturnStatement from '../src/return_statement';
import Token from '../src/token';
const LOWEST = 1;
/* to be used in future
const LOR = 2;
const LAND = 3;
const EQUALS = 4;
const LESSGREATER = 5;
const SUM = 6;
const PRODUCT = 7;
const PREFIX = 8;
const BITWISE = 9;
const CALL = 10;
const INDEX = 11;
*/

export default class Parser {
  /*
   * @constructor
   * param {Lexer} lexer
   */
  constructor(lexer){
    this.lexer = lexer;
    this.errors = [];
    this.nextToken();
    this.nextToken();
  }
  /*
   * read and set for both of cur and peek
   */
  nextToken(){
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.NextToken();
  }
  /*
   * parse and return the program
   */
  ParseProgram(){
    const p = new Program();
    for(;Token.TOKEN_TYPE.EOF !== this.curToken.Type;
      this.nextToken()){
      const stmt = this.parseStatement();
      if(undefined !== stmt){
        p.Statements.push(stmt);
      }
    }
    return p;
  }
  /*
   * parse Statement
   */
  parseStatement(){
    switch(this.curToken.Type){
    case Token.TOKEN_TYPE.LET :
      return this.parseLetStatement();
    case Token.TOKEN_TYPE.RETURN :
      return this.parseReturnStatement();
    }
    return this.parseExpressionStatement();
  }
  /*
   * parse Expression
   */
  parseExpression(){
    let leftExp;
    switch(this.curToken.Type){
    case Token.TOKEN_TYPE.IDENT :
      leftExp =  this.parseIdentifier();
      break;
    case Token.TOKEN_TYPE.INT :
      leftExp =  this.parseIntegerLiteral();
      break;
    default :
      leftExp = undefined;
    }
    return leftExp;
  }
  /*
   * parse Identifier
   */
  parseIdentifier(){
    return new Identifier(
      this.curToken,
      this.curToken.Literal
    );
  }
  /*
   * parse IntegerLiteral
   */
  parseIntegerLiteral(){
    return new IntegerLiteral(
      this.curToken,
      parseInt(this.curToken.Literal,10)
    );
  }
  /*
   * parse LetStatement
   */
  parseLetStatement(){
    const letToken = this.curToken;
    if(!this.expectPeek(Token.TOKEN_TYPE.IDENT)){
      return undefined;
    }
    const stmt = new LetStatement(
      letToken,
      new Identifier(
        this.curToken,
        this.curToken.Literal
      )
    );
    if(!this.expectPeek(Token.TOKEN_TYPE.ASSIGN)){
      return undefined;
    }
    while(!this.curTokenIs(Token.TOKEN_TYPE.SEMICOLON)){
      this.nextToken();
    }
    return stmt;
  }
  /*
   * parse ReturnStatement
   */
  parseReturnStatement(){
    const stmt = new ReturnStatement(
      this.curToken
    );
    this.nextToken();
    while(!this.curTokenIs(Token.TOKEN_TYPE.SEMICOLON)){
      this.nextToken();
    }
    return stmt;
  }
  /*
   * parse ExpressionStatement
   */
  parseExpressionStatement(){
    const stmt = new ExpressionStatement(
      this.curToken,
      this.parseExpression(LOWEST)
    );
    if(this.peekTokenIs(Token.TOKEN_TYPE.SEMICOLON)){
      this.nextToken();
    }
    return stmt;
  }
  /*
   * check curToken
   */
  curTokenIs(type){
    return undefined !== this.curToken &&
      this.curToken.Type === type;
  }
  /*
   * check peekToken
   */
  peekTokenIs(type){
    return undefined !== this.peekToken &&
      this.peekToken.Type === type;
  }
  /*
   * expect peekToken
   */
  expectPeek(type){
    if(this.peekTokenIs(type)){
      this.nextToken();
      return true;
    }
    this.peekError(type);
    return false;
  }
  /*
   * expect peekToken
   */
  peekError(type){
    this.errors.push(
      `expected next token to be ${type}, got ${this.peekToken.Type} instead`
    );
  }
  /*
   * return errors
   */
  get Errors(){
    return this.errors;
  }
}
