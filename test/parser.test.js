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
    test('parse a let statement', () => {
      let i = new Parser(new Lexer(
        `let x = 5;
        let y = 10;
        let foobar = 838383;`
      ));
      expect(typeof i.ParseProgram).toBe('function');
      let stmt = i.ParseProgram();
      expect(stmt.statements.length).toBe(3);
      const expectedIdents = ['x','y','foobar'];
      for(let i = 0; i < expectedIdents.length; i++){
        expect(stmt.statements[i].constructor.name).toBe('LetStatement');
        expect(stmt.statements[i].token.constructor.name).toBe('Token');
        expect(stmt.statements[i].token.type).toBe(Token.TOKEN_TYPE.LET);
        expect(stmt.statements[i].token.literal).toBe('let');
        expect(stmt.statements[i].name.constructor.name).toBe('Identifier');
        expect(stmt.statements[i].name.token.type).toBe(Token.TOKEN_TYPE.IDENT);
        expect(stmt.statements[i].name.token.literal).toBe(expectedIdents[i]);
        expect(stmt.statements[i].name.value).toBe(expectedIdents[i]);
      }

      i = new Parser(new Lexer('let 10'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);

      i = new Parser(new Lexer('let me'));
      stmt = i.ParseProgram();
      expect(stmt).not.toBe(undefined);
    });
  });
});
