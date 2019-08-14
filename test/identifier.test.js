import Identifier from '../src/identifier';
import Token from '../src/token';
describe('Identifier', () => {
  describe('constructer', () => {
    test('new Identifier', () => {
      const i = new Identifier();
      expect(i).not.toBeNull();
      expect(i.token).toBe(undefined);
      expect(i.value).toBe(undefined);
    });
  });
  describe('toString', () => {
    test('string expression', () => {
      const i = new Identifier(undefined,'value');
      expect(typeof i.toString).toBe('function');
      const str = `${i}`;
      expect(str).toBe("value");
    });
  });
  describe('expressionNode', () => {
    test('only check the existence', () => {
      const i = new Identifier();
      expect(typeof i.expressionNode).toBe('function');
      i.expressionNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new Identifier();
      expect(typeof i.TokenLiteral).toBe('function');
      i.token = new Token('INT','10');
      i.TokenLiteral();
    });
  });
});
