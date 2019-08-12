import Token from '../src/token';
import Lexer from '../src/lexer';
import Parser from '../src/parser';
describe('Parser', () => {
  describe('constructer', () => {
    test('new Parser', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(i.lexer.input).toBe('let var = 10;');
    });
  });
  describe('nextToken', () => {
    test('for reading single token', () => {
      // Parser.constructor runs nextToken twice
      let i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.nextToken).toBe('function');
      expect(i.curToken.type).toBe(Token.TOKEN_TYPE.LET);
      expect(i.curToken.literal).toBe("let");
      expect(i.peekToken.type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(i.peekToken.literal).toBe("var");
    });
  });
  describe('ParseProgram', () => {
    test('only check the existence', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.ParseProgram).toBe('function');
      let stmt = i.ParseProgram();
      expect(stmt.statements.length).toBe(1);
      expect(stmt.statements[0].constructor.name).toBe('LetStatement');
      expect(stmt.statements[0].token.constructor.name).toBe('Token');
      expect(stmt.statements[0].token.type).toBe(Token.TOKEN_TYPE.LET);
      expect(stmt.statements[0].token.literal).toBe('let');
      expect(stmt.statements[0].name.constructor.name).toBe('Identifier');
      expect(stmt.statements[0].name.token.type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(stmt.statements[0].name.token.literal).toBe('var');
      expect(stmt.statements[0].name.value).toBe('var');

      i = new Parser(new Lexer('let 10'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);

      i = new Parser(new Lexer('let me'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);
    });
  });
});
