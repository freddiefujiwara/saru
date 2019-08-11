import Node from '../src/node';
describe('Node', () => {
  describe('constructer', () => {
    test('new Node', () => {
      let i = new Node();
      expect(i).not.toBeNull();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      let i = new Node();
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
    });
  });
});
