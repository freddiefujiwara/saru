import ExpressionStatement from '../src/return_statement';
import Token from '../src/token';
describe('ExpressionStatement', () => {
  describe('constructer', () => {
    test('new ExpressionStatement', () => {
      const i = new ExpressionStatement();
      expect(i).not.toBeNull();
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
