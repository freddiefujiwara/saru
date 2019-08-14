import Token from '../src/token';
describe('Token', () => {
  describe('constructer', () => {
    test('new Token', () => {
      const i = new Token('INT', '10');
      expect(i.Type).toBe('INT');
      expect(i.Literal).toBe('10');
      expect(Token.TOKEN_TYPE.COMMA).toBe(',');
    });
  });
  describe('static LookupIdent', () => {
    test('Token.LookupIdent("c")', () => {
      expect(typeof Token.LookupIdent).toBe('function');
      expect(Token.LookupIdent('ident')).toBe(Token.TOKEN_TYPE.IDENT);
      const expectation = {
        'as': Token.TOKEN_TYPE.AS,
        'import': Token.TOKEN_TYPE.IMPORT,
        'fn': Token.TOKEN_TYPE.FUNCTION,
        'while': Token.TOKEN_TYPE.WHILE,
        'for': Token.TOKEN_TYPE.FOR,
        'let': Token.TOKEN_TYPE.LET,
        'true': Token.TOKEN_TYPE.TRUE,
        'false': Token.TOKEN_TYPE.FALSE,
        'if': Token.TOKEN_TYPE.IF,
        'else': Token.TOKEN_TYPE.ELSE,
        'return': Token.TOKEN_TYPE.RETURN,
        'and': Token.TOKEN_TYPE.LAND,
        'or': Token.TOKEN_TYPE.LOR
      };
      const keys = Object.keys(expectation);
      for(const key of keys){
        expect(Token.LookupIdent(key)).toBe(expectation[key]);
      }
    });
  });
  describe('Type', () => {
    test('string expression', () => {
      const i = new Token('INT', '10');
      expect(i.Type).toBe('INT');
    });
  });
  describe('Literal', () => {
    test('string expression', () => {
      const i = new Token('INT', '10');
      expect(i.Literal).toBe('10');
    });
  });
});
