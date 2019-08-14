import Program from '../src/program';
import Statement from '../src/statement';
describe('Program', () => {
  describe('constructer', () => {
    test('new Program', () => {
      const i = new Program();
      expect(i).not.toBeNull();
      expect(i.statements.length).toBe(0);
    });
  });
  describe('TokenLiteral', () => {
    test('only check the existence', () => {
      const i = new Program();
      expect(typeof i.TokenLiteral).toBe('function');
      expect(i.TokenLiteral()).toBe('');
      i.statements.push(new Statement());
      expect(i.TokenLiteral()).toBe(undefined);
    });
  });
});
