import Statement from '../src/statement';
describe('Statement', () => {
  describe('constructer', () => {
    test('new Statement', () => {
      const i = new Statement();
      expect(i).not.toBeNull();
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      const i = new Statement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
});
