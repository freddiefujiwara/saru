import Token from '../src/token';
import Lexer from '../src/lexer';
import Parser from '../src/parser';
describe('Parser', () => {
  describe('constructer', () => {
    test('new Parser', () => {
      const i = new Parser(new Lexer('let var = 10;'));
      expect(i.lexer.Input).toBe('let var = 10;');
      expect(i.errors.length).toBe(0);
    });
  });
  describe('nextToken', () => {
    test('for reading single token', () => {
      // Parser.constructor runs nextToken twice
      const i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.nextToken).toBe('function');
      expect(i.curToken.Type).toBe(Token.TOKEN_TYPE.LET);
      expect(i.curToken.Literal).toBe('let');
      expect(i.peekToken.Type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(i.peekToken.Literal).toBe('var');
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
      expect(stmt.Statements.length).toBe(7); // 3 let statements and '5' '=' '10' '838383'
      const expectedIdentifiers = ['x','y','foobar'];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(stmt.Statements[ind].constructor.name).toBe('LetStatement');
        expect(stmt.Statements[ind].Token.constructor.name).toBe('Token');
        expect(stmt.Statements[ind].Token.Type).toBe(Token.TOKEN_TYPE.LET);
        expect(stmt.Statements[ind].Token.Literal).toBe('let');
        expect(stmt.Statements[ind].Name.constructor.name).toBe('Identifier');
        expect(stmt.Statements[ind].Name.Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
        expect(stmt.Statements[ind].Name.Token.Literal).toBe(expectedIdentifiers[ind]);
        expect(stmt.Statements[ind].Name.Value).toBe(expectedIdentifiers[ind]);
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
    test('parse return statements', () => {
      const i = new Parser(new Lexer(`
        return 5;
        return 10;
        return 993322;
      `));
      expect(typeof i.ParseProgram).toBe('function');
      const stmt = i.ParseProgram();
      expect(stmt.Statements.length).toBe(3);
      const expectedIdentifiers = ['5','10','993322'];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(stmt.Statements[ind].constructor.name).toBe('ReturnStatement');
        expect(stmt.Statements[ind].Token.constructor.name).toBe('Token');
        expect(stmt.Statements[ind].Token.Type).toBe(Token.TOKEN_TYPE.RETURN);
        expect(stmt.Statements[ind].Token.Literal).toBe('return');
      }
    });
    test('parse expression statements', () => {
      const i = new Parser(new Lexer(`
        foobar;
      `));
      const stmt = i.ParseProgram();
      expect(stmt.Statements.length).toBe(1);
      expect(stmt.Statements[0].constructor.name).toBe('ExpressionStatement');
      expect(stmt.Statements[0].Token.constructor.name).toBe('Token');
      expect(stmt.Statements[0].Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(stmt.Statements[0].Token.Literal).toBe('foobar');
      expect(stmt.Statements[0].Expression.constructor.name).toBe('Identifier');
      expect(stmt.Statements[0].Expression.Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(stmt.Statements[0].Expression.Token.Literal).toBe('foobar');
      expect(stmt.Statements[0].Expression.Value).toBe('foobar');
    });
  });
  describe('Errors', () => {
    test('check current errors', () => {
      const i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.Errors).toBe('object');
      expect(i.Errors.length).toBe(0);
    });
  });
  describe('peekError', () => {
    test('add peek error and check', () => {
      const i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.peekError).toBe('function');
      i.peekError(Token.TOKEN_TYPE.INT);
      expect(i.Errors.length).toBe(1);
    });
  });
});
