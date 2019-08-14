import LetStatement from '../src/let_statement';
import Token from '../src/token';
import Identifier from '../src/identifier';
describe('LetStatement', () => {
  describe('constructer', () => {
    test('new LetStatement', () => {
      const i = new LetStatement();
      expect(i).not.toBeNull();
    });
  });
  describe('toString', () => {
    test('string expression', () => {
      const i = new LetStatement(
        new Token(Token.TOKEN_TYPE.LET,'let'),
        new Identifier(undefined,'val')
      );
      expect(typeof i.toString).toBe('function');
      expect(i.Value).toBe(undefined);
      const str = `${i}`;
      expect(str).toBe("let val = undefined");
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      const i = new LetStatement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new LetStatement(
        new Token('INT','10')
      );
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
      expect(i.TokenLiteral()).toBe('10');
    });
  });
});
