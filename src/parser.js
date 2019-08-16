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

const _nextToken = Symbol('nextToken');
const _parseStatement = Symbol('parseStatement');
const _parseExpression = Symbol('parseExpression');
const _parseIdentifier = Symbol('parseIdentifier');
const _parseBoolean = Symbol('parseBoolean');
const _parseIntegerLiteral = Symbol('parseIntegerLiteral');
const _parseFunctionLiteral = Symbol('parseFunctionLiteral');
const _parseFunctionParameters = Symbol('parseFunctionParameters');
const _parseCallExpression = Symbol('parseCallExpression');
const _parseExpressionList = Symbol('parseExpressionList');
const _parseLetStatement = Symbol('parseLetStatement');
const _parseReturnStatement = Symbol('parseReturnStatement');
const _parseExpressionStatement = Symbol('parseExpressionStatement');
const _parseBlockStatement = Symbol('parseBlockStatement');
const _parseIfExpression = Symbol('parseIfExpression');
const _parsePrefixExpression = Symbol('parsePrefixExpression');
const _parseInfixExpression = Symbol('parseInfixExpression');
const _parseGroupedExpression = Symbol('parseGroupedExpression');
const _curPrecedence = Symbol('curPrecedence');
const _peekPrecedence = Symbol('peekPrecedence');
const _curTokenIs = Symbol('curTokenIs');
const _peekTokenIs = Symbol('peekTokenIs');
const _expectPeek = Symbol('expectPeek');
const _peekError = Symbol('peekError');
const _errors = Symbol('errors');
const _lexer = Symbol('lexer');
const LOWEST = 1;
const EQUALS = 4;
const LESSGREATER = 5;
const SUM = 6;
const PRODUCT = 7;
const PREFIX = 8;
const BITWISE = 9;
const CALL = 10;
const INDEX = 11;
let PRECEDENCE = {
  [Token.TOKEN_TYPE.LOR]: EQUALS,
  [Token.TOKEN_TYPE.LAND]: EQUALS,
  [Token.TOKEN_TYPE.EQ]: EQUALS,
  [Token.TOKEN_TYPE.NOT_EQ]: EQUALS,
  [Token.TOKEN_TYPE.LT]: LESSGREATER,
  [Token.TOKEN_TYPE.LTE]: LESSGREATER,
  [Token.TOKEN_TYPE.GT]: LESSGREATER,
  [Token.TOKEN_TYPE.GTE]: LESSGREATER,
  [Token.TOKEN_TYPE.PLUS]: SUM,
  [Token.TOKEN_TYPE.MINUS]: SUM,
  [Token.TOKEN_TYPE.SLASH]: PRODUCT,
  [Token.TOKEN_TYPE.ASTERISK]: PRODUCT,
  [Token.TOKEN_TYPE.EXPONENT]: PRODUCT,
  [Token.TOKEN_TYPE.REM]: PRODUCT,
  [Token.TOKEN_TYPE.BIT_AND]: BITWISE,
  [Token.TOKEN_TYPE.BIT_OR]: BITWISE,
  [Token.TOKEN_TYPE.BIT_XOR]: BITWISE,
  [Token.TOKEN_TYPE.BIT_NOT]: BITWISE,
  [Token.TOKEN_TYPE.BIT_LSHIFT]: BITWISE,
  [Token.TOKEN_TYPE.BIT_RSHIFT]: BITWISE,
  [Token.TOKEN_TYPE.BIT_ZRSHIFT]: BITWISE,
  [Token.TOKEN_TYPE.RANGE]: BITWISE,
  [Token.TOKEN_TYPE.RANGE_INCL]: BITWISE,
  [Token.TOKEN_TYPE.LPAREN]: CALL,
  [Token.TOKEN_TYPE.LBRACKET]: INDEX,
};
export default class Parser {
  /*
   * parse and return the program
   */
  ParseProgram(){
    const p = new Program();
    for(;!this[_curTokenIs](Token.TOKEN_TYPE.EOF);
      this[_nextToken]()){
      const stmt = this[_parseStatement]();
      if(undefined !== stmt
        && Token.TOKEN_TYPE.SEMICOLON !== stmt.Token.Type
      ){
        p.Statements.push(stmt);
      }
    }
    return p;
  }
  /*
   * return errors
   */
  get Errors(){
    return this[_errors];
  }
  /*
   * return lexer
   */
  get Lexer(){
    return this[_lexer];
  }
  /*
   * @constructor
   * param {Lexer} lexer
   */
  constructor(lexer){
    this[_lexer] = lexer;
    this[_errors] = [];
    // private methods
    //   _nextToken
    this[_nextToken] = () =>{
      this.curToken = this.peekToken;
      this.peekToken = this[_lexer].NextToken();
    };
    //   _parseStatement
    this[_parseStatement] = () =>{
      switch(this.curToken.Type){
      case Token.TOKEN_TYPE.LET :
        return this[_parseLetStatement]();
      case Token.TOKEN_TYPE.RETURN :
        return this[_parseReturnStatement]();
      }
      return this[_parseExpressionStatement]();
    };
    //   _parseExpression
    this[_parseExpression] = (precedence = LOWEST) =>{
      let leftExp;
      switch(this.curToken.Type){
      case Token.TOKEN_TYPE.IDENT :
        leftExp =  this[_parseIdentifier]();
        break;
      case Token.TOKEN_TYPE.INT :
        leftExp =  this[_parseIntegerLiteral]();
        break;
      case Token.TOKEN_TYPE.BANG :
      case Token.TOKEN_TYPE.MINUS :
      case Token.TOKEN_TYPE.BIT_NOT :
        leftExp =  this[_parsePrefixExpression]();
        break;
      case Token.TOKEN_TYPE.TRUE:
      case Token.TOKEN_TYPE.FALSE:
        leftExp =  this[_parseBoolean]();
        break;
      case Token.TOKEN_TYPE.LPAREN:
        leftExp =  this[_parseGroupedExpression]();
        break;
      case Token.TOKEN_TYPE.FUNCTION:
        leftExp =  this[_parseFunctionLiteral]();
        break;
      case Token.TOKEN_TYPE.IF:
        leftExp =  this[_parseIfExpression]();
        break;
      default :
        leftExp = undefined;
      }
      while(!this[_peekTokenIs](Token.TOKEN_TYPE.SEMICOLON) &&
        precedence < this[_peekPrecedence]()){
        switch(this.peekToken.Type){
        case Token.TOKEN_TYPE.PLUS:
        case Token.TOKEN_TYPE.MINUS:
        case Token.TOKEN_TYPE.SLASH:
        case Token.TOKEN_TYPE.ASTERISK:
        case Token.TOKEN_TYPE.EXPONENT:
        case Token.TOKEN_TYPE.EQ:
        case Token.TOKEN_TYPE.NOT_EQ:
        case Token.TOKEN_TYPE.LT:
        case Token.TOKEN_TYPE.LTE:
        case Token.TOKEN_TYPE.GT:
        case Token.TOKEN_TYPE.GTE:
        case Token.TOKEN_TYPE.REM:
        case Token.TOKEN_TYPE.LAND:
        case Token.TOKEN_TYPE.LOR:
        case Token.TOKEN_TYPE.BIT_AND:
        case Token.TOKEN_TYPE.BIT_OR:
        case Token.TOKEN_TYPE.BIT_XOR:
        case Token.TOKEN_TYPE.BIT_LSHIFT:
        case Token.TOKEN_TYPE.BIT_RSHIFT:
        case Token.TOKEN_TYPE.BIT_ZRSHIFT:
        case Token.TOKEN_TYPE.RANGE:
        case Token.TOKEN_TYPE.RANGE_INCL:
          this[_nextToken]();
          leftExp = this[_parseInfixExpression](leftExp);
          break;
        case Token.TOKEN_TYPE.LPAREN:
          this[_nextToken]();
          leftExp = this[_parseCallExpression](leftExp);
          break;
        }
      }
      return leftExp;
    };
    //   _parseIdentifier
    this[_parseIdentifier] = () =>{
      return new Identifier(
        this.curToken,
        this.curToken.Literal
      );
    };
    //   _parseBoolean
    this[_parseBoolean] = () =>{
      return new BooleanLiteral(
        this.curToken,
        this[_curTokenIs](Token.TOKEN_TYPE.TRUE)
      );
    };
    //   _parseIntegerLiteral
    this[_parseIntegerLiteral] = () =>{
      return new IntegerLiteral(
        this.curToken,
        parseInt(this.curToken.Literal,10)
      );
    };
    //   _parseCallExpression
    this[_parseCallExpression] = (func) => {
      return new CallExpression(this.curToken, func, this[_parseExpressionList](Token.TOKEN_TYPE.RPAREN));
    };
    //   _parseExpressionList
    this[_parseExpressionList] = (end) =>{
      let list = [];
      if (this[_peekTokenIs](end)) {
        this[_nextToken]();
        return list;
      }
      this[_nextToken]();
      list.push(this[_parseExpression](LOWEST));
      while (this[_peekTokenIs](Token.TOKEN_TYPE.COMMA)) {
        this[_nextToken]();
        this[_nextToken]();
        list.push(this[_parseExpression](LOWEST));
      }
      if (!this[_expectPeek](end)) {
        return [];
      }
      return list;
    };
    //   _parseFunctionLiteral
    this[_parseFunctionLiteral] = () => {
      const curToken = this.curToken;
      if (!this[_expectPeek](Token.TOKEN_TYPE.LPAREN)) {
        return undefined;
      }
      const parameters = this[_parseFunctionParameters]();
      if (!this[_expectPeek](Token.TOKEN_TYPE.LBRACE)) {
        return undefined;
      }
      const body = this[_parseBlockStatement]();
      return new FunctionLiteral(curToken, parameters, body);
    };
    this[_parseFunctionParameters] = () => {
      let identifiers = [];
      if (this[_peekTokenIs](Token.TOKEN_TYPE.RPAREN)) {
        this[_nextToken]();
        return identifiers;
      }
      this[_nextToken]();
      let ident = new Identifier(this.curToken, this.curToken.Literal);
      identifiers.push(ident);
      while (this[_peekTokenIs](Token.TOKEN_TYPE.COMMA)) {
        this[_nextToken]();
        this[_nextToken]();
        ident = new Identifier(this.curToken, this.curToken.Literal);
        identifiers.push(ident);
      }
      if (!this[_expectPeek](Token.TOKEN_TYPE.RPAREN)) {
        return [];
      }
      return identifiers;
    };
    //   _parseLetStatement
    this[_parseLetStatement] = () =>{
      const letToken = this.curToken;
      if(!this[_expectPeek](Token.TOKEN_TYPE.IDENT)){
        return undefined;
      }
      const stmt = new LetStatement(
        letToken,
        new Identifier(
          this.curToken,
          this.curToken.Literal
        )
      );
      if(!this[_expectPeek](Token.TOKEN_TYPE.ASSIGN)){
        return undefined;
      }
      while(!this[_curTokenIs](Token.TOKEN_TYPE.SEMICOLON)){
        this[_nextToken]();
      }
      return stmt;
    };
    //   _parseReturnStatement
    this[_parseReturnStatement] = () =>{
      const stmt = new ReturnStatement(
        this.curToken
      );
      this[_nextToken]();
      while(!this[_curTokenIs](Token.TOKEN_TYPE.SEMICOLON)){
        this[_nextToken]();
      }
      return stmt;
    };
    //   _parseExpressionStatement
    this[_parseExpressionStatement] = () =>{
      const stmt = new ExpressionStatement(
        this.curToken,
        this[_parseExpression](LOWEST)
      );
      if(this[_peekTokenIs](Token.TOKEN_TYPE.SEMICOLON)){
        this[_nextToken]();
      }
      return stmt;
    };
    //   _parseBlockStatement
    this[_parseBlockStatement] = () => {
      let block = new BlockStatement(this.curToken);
      this[_nextToken]();
      while (!this[_curTokenIs](Token.TOKEN_TYPE.RBRACE) && !this[_curTokenIs](Token.TOKEN_TYPE.EOF)) {
        const stmt = this[_parseStatement]();
        if (undefined !== stmt) {
          block.Statements.push(stmt);
        }
        this[_nextToken]();
      }
      return block;
    };
    //   _parseIfExpression
    this[_parseIfExpression] = () => {
      const curToken = this.curToken;
      if (!this[_expectPeek](Token.TOKEN_TYPE.LPAREN)) {
        return undefined;
      }
      this[_nextToken]();
      const condition = this[_parseExpression](LOWEST);
      if (!this[_expectPeek](Token.TOKEN_TYPE.RPAREN)) {
        return undefined;
      }
      if (!this[_expectPeek](Token.TOKEN_TYPE.LBRACE)) {
        return undefined;
      }
      const consequence = this[_parseBlockStatement]();
      let alternative = undefined;
      if (this[_peekTokenIs](Token.TOKEN_TYPE.ELSE)) {
        this[_nextToken]();
        if (!this[_expectPeek](Token.TOKEN_TYPE.LBRACE)) {
          return undefined;
        }
        alternative = this[_parseBlockStatement]();
      }
      return new IfExpression(curToken, condition, consequence, alternative);
    };
    //   _parsePrefixExpression
    this[_parsePrefixExpression] = () =>{
      const curToken = this.curToken;
      this[_nextToken]();
      return new PrefixExpression(
        curToken,
        curToken.Literal,
        this[_parseExpression](PREFIX)
      );
    };
    //   _parseInfixExpression
    this[_parseInfixExpression] = (left) =>{
      const curToken = this.curToken;
      const curPrecedence = this[_curPrecedence]();
      this[_nextToken]();
      return new InfixExpression(
        curToken,
        left,
        curToken.Literal,
        this[_parseExpression](
          curPrecedence
        )
      );
    };
    //   _parseGroupedExpression
    this[_parseGroupedExpression] = () => {
      this[_nextToken]();
      const exp = this[_parseExpression](LOWEST);
      if (!this[_expectPeek](Token.TOKEN_TYPE.RPAREN)) {
        return undefined;
      }
      return exp;
    };
    //   _curPrecedence
    this[_curPrecedence] = () =>{
      return undefined !== PRECEDENCE[this.curToken.Type] ?
        PRECEDENCE[this.curToken.Type]
        : LOWEST;
    };
    //   _peekPrecedence
    this[_peekPrecedence] = () =>{
      return undefined !== PRECEDENCE[this.peekToken.Type] ?
        PRECEDENCE[this.peekToken.Type]
        : LOWEST;
    };
    //   _curTokenIs
    this[_curTokenIs] = (type) =>{
      return undefined !== this.curToken &&
        this.curToken.Type === type;
    };
    //   _peekTokenIs
    this[_peekTokenIs] = (type) =>{
      return undefined !== this.peekToken &&
        this.peekToken.Type === type;
    };
    //   _expectPeek
    this[_expectPeek] = (type) =>{
      if(this[_peekTokenIs](type)){
        this[_nextToken]();
        return true;
      }
      this[_peekError](type);
      return false;
    };
    //   _peekError
    this[_peekError] = (type) =>{
      this[_errors].push(
        `expected next token to be ${type}, got ${this.peekToken.Type} instead`
      );
    };
    this[_nextToken]();
    this[_nextToken]();
  }
}
