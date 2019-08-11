import Identifier from '../src/identifier';
import Token from '../src/token';
describe('Identifier', () => {
  describe('constructer', () => {
    test('new Identifier', () => {
      let i = new Identifier();
      expect(i).not.toBeNull();
      expect(i.node).toBe(undefined);
      expect(i.token).toBe(undefined);
      expect(i.value).toBe(undefined);
    });
  });
  describe('expressionNode', () => {
    test('only check the existence', () => {
      let i = new Identifier();
      expect(typeof i.expressionNode).toBe('function');
      i.expressionNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      let i = new Identifier();
      expect(typeof i.TokenLiteral).toBe('function');
      i.token = new Token('INT','10');
      i.TokenLiteral();
    });
  });
});
