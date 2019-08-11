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
      expect(i.ParseProgram()).toBe(undefined);

    });
  });
});
