import Node from '../src/node';
describe('Node', () => {
  describe('constructer', () => {
    test('new Node', () => {
      const i = new Node();
      expect(i).not.toBeNull();
    });
  });
  describe('toString', () => {
    test('string expression', () => {
      const i = new Node();
      const str = `${i}`;
      expect(str).toBe("Node {}");
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new Node();
      expect(typeof i.TokenLiteral).toBe('function');
      i.TokenLiteral();
    });
  });
});
