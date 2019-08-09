import Token from '../src/token';
test('new Token', () => {
  let t = new Token('INT', '10');
  expect(t.type).toBe('INT');
  expect(t.literal).toBe('10');
});
