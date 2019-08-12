import Token from '../src/token';
import Lexer from '../src/lexer';
import Parser from '../src/parser';
describe('Parser', () => {
  describe('constructer', () => {
    test('new Parser', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(i.lexer.input).toBe('let var = 10;');
      expect(i.errors.length).toBe(0);
    });
  });
  describe('nextToken', () => {
    test('for reading single token', () => {
      // Parser.constructor runs nextToken twice
      let i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.nextToken).toBe('function');
      expect(i.curToken.type).toBe(Token.TOKEN_TYPE.LET);
      expect(i.curToken.literal).toBe('let');
      expect(i.peekToken.type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(i.peekToken.literal).toBe('var');
    });
  });
  describe('ParseProgram', () => {
    test('parse a let statement', () => {
      let i = new Parser(new Lexer(`
        let x = 5;
        let y = 10;
        let foobar = 838383;
        let x  5;
        let  = 10;
        let 838383;
      `));
      expect(typeof i.ParseProgram).toBe('function');
      let stmt = i.ParseProgram();
      expect(stmt.statements.length).toBe(3);
      const expectedIdentifiers = ['x','y','foobar'];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(stmt.statements[ind].constructor.name).toBe('LetStatement');
        expect(stmt.statements[ind].token.constructor.name).toBe('Token');
        expect(stmt.statements[ind].token.type).toBe(Token.TOKEN_TYPE.LET);
        expect(stmt.statements[ind].token.literal).toBe('let');
        expect(stmt.statements[ind].name.constructor.name).toBe('Identifier');
        expect(stmt.statements[ind].name.token.type).toBe(Token.TOKEN_TYPE.IDENT);
        expect(stmt.statements[ind].name.token.literal).toBe(expectedIdentifiers[ind]);
        expect(stmt.statements[ind].name.value).toBe(expectedIdentifiers[ind]);
      }
      const expectedErrors = [
        'expected next token to be =, got INT instead',
        'expected next token to be IDENT, got = instead',
        'expected next token to be IDENT, got INT instead'
      ];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(i.Errors[ind]).toBe(expectedErrors[ind]);
      }

      i = new Parser(new Lexer('let 10'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);

      i = new Parser(new Lexer('let me'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);
    });
  });
  describe('Errors', () => {
    test('check current errors', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.Errors).toBe('object');
      expect(i.Errors.length).toBe(0);
    });
  });
  describe('peekError', () => {
    test('add peek error and check', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.peekError).toBe('function');
      i.peekError(Token.TOKEN_TYPE.INT);
      expect(i.Errors.length).toBe(1);
    });
  });
});
