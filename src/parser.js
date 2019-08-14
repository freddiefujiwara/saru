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
    return undefined;
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
