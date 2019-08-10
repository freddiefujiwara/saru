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
    test('check for each TOKEN_TYPEs', () => {
      const expectedPairs = [['=',Token.TOKEN_TYPE.ASSIGN],
        ['+',Token.TOKEN_TYPE.PLUS],
        ['-',Token.TOKEN_TYPE.MINUS],
        ['!',Token.TOKEN_TYPE.BANG],
        ['/',Token.TOKEN_TYPE.SLASH],
        ['*',Token.TOKEN_TYPE.ASTERISK],
        ['%',Token.TOKEN_TYPE.REM],
        ['&',Token.TOKEN_TYPE.BIT_AND],
        ['|',Token.TOKEN_TYPE.BIT_OR],
        ['.',Token.TOKEN_TYPE.PERIOD],
        ['^',Token.TOKEN_TYPE.BIT_XOR],
        ['~',Token.TOKEN_TYPE.BIT_NOT],
        ['<',Token.TOKEN_TYPE.LT],
        ['>',Token.TOKEN_TYPE.GT],
        [';',Token.TOKEN_TYPE.SEMICOLON],
        [',',Token.TOKEN_TYPE.COMMA],
        ['{',Token.TOKEN_TYPE.LBRACE],
        ['}',Token.TOKEN_TYPE.RBRACE],
        ['(',Token.TOKEN_TYPE.LPAREN],
        [')',Token.TOKEN_TYPE.RPAREN],
        ['[',Token.TOKEN_TYPE.LBRACKET],
        [']',Token.TOKEN_TYPE.RBRACKET],
        [':',Token.TOKEN_TYPE.COLON],
        ['',Token.TOKEN_TYPE.EOF]];

      let i = new Lexer('=+-!/*%&|.^~<>;,{}()[]:');
      expect(typeof i.NextToken).toBe('function');
      for( let ind = 0; ind < expectedPairs.length ; ind ++){
        let t = i.NextToken();
        expect(t.literal).toBe(expectedPairs[ind][0]);
        expect(t.type).toBe(expectedPairs[ind][1]);
      }
    });
    test('check for actual code', () => {
      let i = new Lexer('\n\
      let five = 5; \n\
      let ten = 10;@ \n\
      let string = \'single\'; \n\
      let string_double = "double"; \n\
      let add = fn(x, y) { \n\
          x + y; #comment \n\
      }; \n\
      let result = add(five, ten);');
      const expectedPairs = [
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'five'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.INT, '5'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'ten'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.INT, '10'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.ILLEGAL, '@'],
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'string'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.STRING, 'single'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'string_double'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.STRING, 'double'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'add'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.FUNCTION, 'fn'],
        [Token.TOKEN_TYPE.LPAREN, '('],
        [Token.TOKEN_TYPE.IDENT, 'x'],
        [Token.TOKEN_TYPE.COMMA, ','],
        [Token.TOKEN_TYPE.IDENT, 'y'],
        [Token.TOKEN_TYPE.RPAREN, ')'],
        [Token.TOKEN_TYPE.LBRACE, '{'],
        [Token.TOKEN_TYPE.IDENT, 'x'],
        [Token.TOKEN_TYPE.PLUS, '+'],
        [Token.TOKEN_TYPE.IDENT, 'y'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.COMMENT, 'comment'],
        [Token.TOKEN_TYPE.RBRACE, '}'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.LET, 'let'],
        [Token.TOKEN_TYPE.IDENT, 'result'],
        [Token.TOKEN_TYPE.ASSIGN, '='],
        [Token.TOKEN_TYPE.IDENT, 'add'],
        [Token.TOKEN_TYPE.LPAREN, '('],
        [Token.TOKEN_TYPE.IDENT, 'five'],
        [Token.TOKEN_TYPE.COMMA, ','],
        [Token.TOKEN_TYPE.IDENT, 'ten'],
        [Token.TOKEN_TYPE.RPAREN, ')'],
        [Token.TOKEN_TYPE.SEMICOLON, ';'],
        [Token.TOKEN_TYPE.EOF, '']];
      for( let ind = 0; ind < expectedPairs.length ; ind ++){
        let t = i.NextToken();
        expect(t.type).toBe(expectedPairs[ind][0]);
        expect(t.literal).toBe(expectedPairs[ind][1]);
      }
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
      expect(i.readNumber()).toBe('100');
    });
  });
});
