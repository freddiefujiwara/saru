import ReturnStatement from '../src/return_statement';
import Token from '../src/token';
describe('ReturnStatement', () => {
  describe('constructer', () => {
    test('new ReturnStatement', () => {
      const i = new ReturnStatement();
      expect(i).not.toBeNull();
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      const i = new ReturnStatement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new ReturnStatement(
        new Token('INT','10')
      );
      expect(i.Token).not.toBe(undefined);
      expect(i.ReturnValue).toBe(undefined);
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
      expect(i.TokenLiteral()).toBe('10');
    });
  });
});
