import Lexer from '../src/lexer';
describe('Lexer', () => {
  describe('constructer', () => {
    test('new Lexer', () => {
      let i = new Lexer('INT');
      expect(i.input).toBe('INT');
      expect(i.position).toBe(0);
      expect(i.readPosition).toBe(0);
      expect(i.ch).toBe(undefined);
    });
  });
  describe('readChar', () => {
    test('i.readChar', () => {
      let i = new Lexer('INT');
      expect(typeof i.readChar).toBe('function');
      i.readChar();
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
      i.readChar();
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
    });
  });
  describe('static isLetter', () => {
    test('Lexer.isLetter("c")', () => {
      expect(typeof Lexer.isLetter).toBe('function');
      expect(Lexer.isLetter("a")).toBe(true);
      expect(Lexer.isLetter("b")).toBe(true);
      expect(Lexer.isLetter("y")).toBe(true);
      expect(Lexer.isLetter("z")).toBe(true);
      expect(Lexer.isLetter("A")).toBe(true);
      expect(Lexer.isLetter("B")).toBe(true);
      expect(Lexer.isLetter("Y")).toBe(true);
      expect(Lexer.isLetter("Z")).toBe(true);
      expect(Lexer.isLetter("_")).toBe(true);
      expect(Lexer.isLetter("-")).toBe(true);
      expect(Lexer.isLetter("0")).toBe(false);
      expect(Lexer.isLetter(undefined)).toBe(false);
      expect(Lexer.isLetter(0)).toBe(false);
    });
  });
  describe('readIdentifier', () => {
    test('i.readIdentifier', () => {
      let i = new Lexer('let me know');
      i.readChar();
      expect(typeof i.readIdentifier).toBe('function');
      expect(i.readIdentifier()).toBe('let');
      i.readChar();
      expect(i.readIdentifier()).toBe('me');
      i.readChar();
      expect(i.readIdentifier()).toBe('know');
    });
  });
});
