import Program from '../src/program';
import Token from '../src/token';
import LetStatement from '../src/let_statement';
import ReturnStatement from '../src/return_statement';
import Identifier from '../src/identifier';

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
    let p = new Program();
    for(;Token.TOKEN_TYPE.EOF !== this.curToken.type;
      this.nextToken()){
      let stmt = this.parseStatement();
      if(undefined !== stmt){
        p.statements.push(stmt);
      }
    }
    return p;
  }
  /*
   * parse Statement
   */
  parseStatement(){
    switch(this.curToken.type){
    case Token.TOKEN_TYPE.LET :
      return this.parseLetStatement();
    case Token.TOKEN_TYPE.RETURN :
      return this.parseReturnStatement();
    }
    return undefined;
  }
  /*
   * parse LetStatement
   */
  parseLetStatement(){
    let stmt = new LetStatement();
    stmt.token = this.curToken;
    if(!this.expectPeek(Token.TOKEN_TYPE.IDENT)){
      return undefined;
    }
    let ident = new Identifier();
    ident.token = this.curToken;
    ident.value = this.curToken.literal;
    stmt.name = ident;
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
    let stmt = new ReturnStatement();
    stmt.token = this.curToken;
    this.nextToken();
    while(!this.curTokenIs(Token.TOKEN_TYPE.SEMICOLON)){
      this.nextToken();
    }
    return stmt;
  }
  /*
   * check curToken
   */
  curTokenIs(type){
    return undefined !== this.curToken &&
      this.curToken.type === type;
  }
  /*
   * check peekToken
   */
  peekTokenIs(type){
    return undefined !== this.peekToken &&
      this.peekToken.type === type;
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
      `expected next token to be ${type}, got ${this.peekToken.type} instead`
    );
  }
  /*
   * return errors
   */
  get Errors(){
    return this.errors;
  }
}
