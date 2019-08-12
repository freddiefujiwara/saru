import ReturnStatement from '../src/return_statement';
import Token from '../src/token';
describe('ReturnStatement', () => {
  describe('constructer', () => {
    test('new ReturnStatement', () => {
      let i = new ReturnStatement();
      expect(i).not.toBeNull();
      expect(i.token).toBe(undefined);
      expect(i.name).toBe(undefined);
      expect(i.value).toBe(undefined);
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      let i = new ReturnStatement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      let i = new ReturnStatement();
      expect(typeof i.TokenLiteral).toBe('function');
      i.token = new Token('INT','10');
      i.TokenLiteral();
    });
  });
});
