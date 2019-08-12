import LetStatement from '../src/let_statement';
import Token from '../src/token';
describe('LetStatement', () => {
  describe('constructer', () => {
    test('new LetStatement', () => {
      let i = new LetStatement();
      expect(i).not.toBeNull();
      expect(i.token).toBe(undefined);
      expect(i.name).toBe(undefined);
      expect(i.value).toBe(undefined);
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      let i = new LetStatement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      let i = new LetStatement();
      expect(typeof i.TokenLiteral).toBe('function');
      i.token = new Token('INT','10');
      i.TokenLiteral();
    });
  });
});
