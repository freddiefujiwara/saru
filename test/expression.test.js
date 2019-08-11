import Expression from '../src/expression';
describe('Expression', () => {
  describe('constructer', () => {
    test('new Expression', () => {
      let i = new Expression();
      expect(i).not.toBeNull();
      expect(i.node).toBe(undefined);
    });
  });
  describe('expressionNode', () => {
    test('only check the existence', () => {
      let i = new Expression();
      expect(typeof i.expressionNode).toBe('function');
      i.expressionNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      let i = new Expression();
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
    });
  });
});
