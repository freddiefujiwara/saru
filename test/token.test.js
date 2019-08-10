import Token from '../src/token';
describe('Token', () => {
  describe('constructer', () => {
    test('new Token', () => {
      let i = new Token('INT', '10');
      expect(i.type).toBe('INT');
      expect(i.literal).toBe('10');
      expect(Token.TOKEN_TYPE.COMMA).toBe(',');
    });
  });
});
