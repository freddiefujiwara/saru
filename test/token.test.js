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
  describe('static LookupIdent', () => {
    test('Token.LookupIdent("c")', () => {
      expect(typeof Token.LookupIdent).toBe('function');
      expect(Token.LookupIdent('ident')).toBe(Token.TOKEN_TYPE.IDENT);
      let expectation = {
        'as': Token.TOKEN_TYPE.AS,
        'import': Token.TOKEN_TYPE.IMPORT,
        'function': Token.TOKEN_TYPE.FUNCTION,
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
      let keys = Object.keys(expectation);
      for(let i = 0 ; i < keys.length ; i ++){
        expect(Token.LookupIdent(keys[i])).toBe(expectation[keys[i]]);
      }
    });
  });
});
