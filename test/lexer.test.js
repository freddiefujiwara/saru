import Lexer from '../src/lexer';
import Token from '../src/token';
describe('Lexer', () => {
  describe('constructer', () => {
    test('new Lexer', () => {
      let i = new Lexer('INT');
      expect(i.input).toBe('INT');
      expect(i.position).toBe(0);
      expect(i.readPosition).toBe(1);
      expect(i.ch).toBe('I');
    });
  });
  describe('readChar', () => {
    test('i.readChar', () => {
      let i = new Lexer('INT');
      expect(typeof i.readChar).toBe('function');
      expect(i.position).toBe(0);
      expect(i.readPosition).toBe(1);
      expect(i.ch).toBe('I');
      i.readChar();
      expect(i.position).toBe(1);
      expect(i.readPosition).toBe(2);
      expect(i.ch).toBe('N');
      i.readChar();
      expect(i.position).toBe(2);
      expect(i.readPosition).toBe(3);
      expect(i.ch).toBe('T');
      i.readChar();
      expect(i.position).toBe(3);
      expect(i.readPosition).toBe(4);
      expect(i.ch).toBe(0);
    });
  });
  describe('NextToken', () => {
    test('i.NextToken', () => {
      let i = new Lexer('=;(),+{}');
      expect(typeof i.NextToken).toBe('function');
      let t = i.NextToken();
      expect(t.type).toBe('=');
      expect(t.literal).toBe('=');
      t = i.NextToken();
      expect(t.type).toBe(';');
      expect(t.literal).toBe(';');
      t = i.NextToken();
      expect(t.type).toBe('(');
      expect(t.literal).toBe('(');
      t = i.NextToken();
      expect(t.type).toBe(')');
      expect(t.literal).toBe(')');
      t = i.NextToken();
      expect(t.type).toBe(',');
      expect(t.literal).toBe(',');
      t = i.NextToken();
      expect(t.type).toBe('+');
      expect(t.literal).toBe('+');
      t = i.NextToken();
      expect(t.type).toBe('{');
      expect(t.literal).toBe('{');
      t = i.NextToken();
      expect(t.type).toBe('}');
      expect(t.literal).toBe('}');
      t = i.NextToken();
      expect(t.type).toBe('EOF');
      expect(t.literal).toBe('');
      i = new Lexer('let val = 100-');
      t = i.NextToken();
      expect(t.type).toBe(Token.TOKEN_TYPE.LET);
      expect(t.literal).toBe('let');
      t = i.NextToken();
      expect(t.type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(t.literal).toBe('val');
      t = i.NextToken();
      expect(t.type).toBe('=');
      expect(t.literal).toBe('=');
      t = i.NextToken();
      expect(t.type).toBe(Token.TOKEN_TYPE.INT);
      expect(t.literal).toBe('100');
      t = i.NextToken();
      expect(t.type).toBe(Token.TOKEN_TYPE.ILLEGAL);
      expect(t.literal).toBe('-');
      t = i.NextToken();
      expect(t.type).toBe('EOF');
      expect(t.literal).toBe('');
    });
  });
  describe('static isLetter', () => {
    test('Lexer.isLetter("c")', () => {
      expect(typeof Lexer.isLetter).toBe('function');
      expect(Lexer.isLetter('a')).toBe(true);
      expect(Lexer.isLetter('b')).toBe(true);
      expect(Lexer.isLetter('y')).toBe(true);
      expect(Lexer.isLetter('z')).toBe(true);
      expect(Lexer.isLetter('A')).toBe(true);
      expect(Lexer.isLetter('B')).toBe(true);
      expect(Lexer.isLetter('Y')).toBe(true);
      expect(Lexer.isLetter('Z')).toBe(true);
      expect(Lexer.isLetter('_')).toBe(true);
      expect(Lexer.isLetter('0')).toBe(false);
      expect(Lexer.isLetter('ab')).toBe(false);
      expect(Lexer.isLetter(undefined)).toBe(false);
      expect(Lexer.isLetter(0)).toBe(false);
    });
  });
  describe('readIdentifier', () => {
    test('i.readIdentifier', () => {
      let i = new Lexer('let \tme \r\nknow_that');
      expect(typeof i.readIdentifier).toBe('function');
      expect(i.readIdentifier()).toBe('let');
      i.skipWhitespace();
      expect(i.readIdentifier()).toBe('me');
      i.skipWhitespace();
      expect(i.readIdentifier()).toBe('know_that');
    });
  });
  describe('static isDigit', () => {
    test('Lexer.isDigit("c")', () => {
      expect(typeof Lexer.isDigit).toBe('function');
      expect(Lexer.isDigit('0')).toBe(true);
      expect(Lexer.isDigit('1')).toBe(true);
      expect(Lexer.isDigit('9')).toBe(true);
      expect(Lexer.isDigit('A')).toBe(false);
      expect(Lexer.isDigit('-1')).toBe(false);
      expect(Lexer.isDigit('1.1')).toBe(false);
      expect(Lexer.isDigit('_')).toBe(false);
      expect(Lexer.isDigit(undefined)).toBe(false);
      expect(Lexer.isDigit(0)).toBe(false);
    });
  });
  describe('skipWhitespace', () => {
    test('i.skipWhitespace', () => {
      let i = new Lexer('let me know_that');
      expect(typeof i.skipWhitespace).toBe('function');
    });
  });
  describe('readNumber', () => {
    test('i.readNumber', () => {
      let i = new Lexer('100');
      expect(typeof i.readNumber).toBe('function');
      expect(i.readNumber()).toBe("100");
    });
  });
});
