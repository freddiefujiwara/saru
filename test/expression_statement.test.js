import Token from '../src/token';
import Identifier from '../src/identifier';
import LetStatement from '../src/let_statement';
import ExpressionStatement from '../src/expression_statement';
describe('ExpressionStatement', () => {
  describe('constructer', () => {
    test('new ExpressionStatement', () => {
      const i = new ExpressionStatement();
      expect(i).not.toBeNull();
    });
  });
  describe('toString', () => {
    test('string expression', () => {
      const i = new ExpressionStatement(
        new Token('INT','10'),
        new LetStatement(
          new Token(Token.TOKEN_TYPE.LET,'let'),
          new Identifier(undefined,'val')
        )
      );
      expect(typeof i.toString).toBe('function');
      expect(i.Value).toBe(undefined);
      const str = `${i}`;
      expect(str).toBe('let val = undefined');
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      const i = new ExpressionStatement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new ExpressionStatement(
        new Token('INT','10')
      );
      expect(i.Token).not.toBe(undefined);
      expect(i.Expression).toBe(undefined);
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
      expect(i.TokenLiteral()).toBe('10');
    });
  });
});
