import Statement from '../src/statement';
describe('Statement', () => {
  describe('constructer', () => {
    test('new Statement', () => {
      let i = new Statement();
      expect(i).not.toBeNull();
      expect(i.node).toBe(undefined);
    });
  });
  describe('statementNode', () => {
    test('only check the existence', () => {
      let i = new Statement();
      expect(typeof i.statementNode).toBe('function');
      i.statementNode();
    });
  });
});