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
});
