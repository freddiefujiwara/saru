import IntegerLiteral from '../src/integer_literal';
import Token from '../src/token';
describe('IntegerLiteral', () => {
  describe('constructer', () => {
    test('new IntegerLiteral', () => {
      const i = new IntegerLiteral();
      expect(i).not.toBeNull();
      expect(i.Token).toBe(undefined);
      expect(i.Value).toBe(undefined);
    });
  });
  describe('toString', () => {
    test('string expression', () => {
      const i = new IntegerLiteral(
        new Token('INT','10'),
        '10'
      );
      expect(typeof i.toString).toBe('function');
      const str = `${i}`;
      expect(str).toBe("10");
    });
  });
  describe('expressionNode', () => {
    test('only check the existence', () => {
      const i = new IntegerLiteral();
      expect(typeof i.expressionNode).toBe('function');
      i.expressionNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new IntegerLiteral(
        new Token('INT','10')
      );
      expect(typeof i.TokenLiteral).toBe('function');
      expect(i.TokenLiteral()).toBe("10");
    });
  });
});
