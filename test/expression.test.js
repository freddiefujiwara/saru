import Expression from '../src/expression';
describe('Expression', () => {
  describe('constructer', () => {
    test('new Expression', () => {
      const i = new Expression();
      expect(i).not.toBeNull();
    });
  });
  describe('expressionNode', () => {
    test('only check the existence', () => {
      const i = new Expression();
      expect(typeof i.expressionNode).toBe('function');
      i.expressionNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new Expression();
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
    });
  });
});
