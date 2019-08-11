import Lexer from '../src/lexer';
import Parser from '../src/parser';
describe('Parser', () => {
  describe('constructer', () => {
    test('new Parser', () => {
      let i = new Parser(new Lexer('let var = 10;'));
      expect(i.lexer.input).toBe('let var = 10;');
    });
  });
});
