import Token from '../src/token';
import Lexer from '../src/lexer';
import Parser from '../src/parser';
describe('Parser', () => {
  describe('constructer', () => {
    test('new Parser', () => {
      const i = new Parser(new Lexer('let var = 10;'));
      expect(i.Lexer.Input).toBe('let var = 10;');
      expect(i.Errors.length).toBe(0);
    });
  });
  describe('ParseProgram', () => {
    test('parse a let statement', () => {
      let i = new Parser(new Lexer(`
        let x = 5;
        let y = 10;
        let foobar = 838383;
        let x  5;
        let  = 10;
        let 838383;
      `));
      expect(typeof i.ParseProgram).toBe('function');
      let program = i.ParseProgram();
      expect(program.Statements.length).toBe(7); // 3 let statements and '5' '=' '10' '838383'
      const expectedIdentifiers = ['x','y','foobar'];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(program.Statements[ind].constructor.name).toBe('LetStatement');
        expect(program.Statements[ind].Token.constructor.name).toBe('Token');
        expect(program.Statements[ind].Token.Type).toBe(Token.TOKEN_TYPE.LET);
        expect(program.Statements[ind].Token.Literal).toBe('let');
        expect(program.Statements[ind].Name.constructor.name).toBe('Identifier');
        expect(program.Statements[ind].Name.Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
        expect(program.Statements[ind].Name.Token.Literal).toBe(expectedIdentifiers[ind]);
        expect(program.Statements[ind].Name.Value).toBe(expectedIdentifiers[ind]);
      }
      const expectedErrors = [
        'expected next token to be =, got INT instead',
        'expected next token to be IDENT, got = instead',
        'expected next token to be IDENT, got INT instead'
      ];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(i.Errors[ind]).toBe(expectedErrors[ind]);
      }
      expect(`${program}`).toBe(
        'let x = 5let y = 10let foobar = 8383835undefined10838383'
      );
      i = new Parser(new Lexer('let 10'));
      program = i.ParseProgram();
      expect(program).not.toBe(undefined);

      i = new Parser(new Lexer('let me'));
      program = i.ParseProgram();
      expect(program).not.toBe(undefined);
    });
    test('parse return statements', () => {
      const i = new Parser(new Lexer(`
        return 5;
        return 10;
        return 993322;
      `));
      expect(typeof i.ParseProgram).toBe('function');
      const program = i.ParseProgram();
      expect(program.Statements.length).toBe(3);
      const expectedIdentifiers = ['5','10','993322'];
      for(let ind = 0; ind < expectedIdentifiers.length; ind++){
        expect(program.Statements[ind].constructor.name).toBe('ReturnStatement');
        expect(program.Statements[ind].Token.constructor.name).toBe('Token');
        expect(program.Statements[ind].Token.Type).toBe(Token.TOKEN_TYPE.RETURN);
        expect(program.Statements[ind].Token.Literal).toBe('return');
      }
    });
    test('parse expression statements', () => {
      const i = new Parser(new Lexer(`
        foobar;
        10;
      `));
      const program = i.ParseProgram();
      expect(program.Statements.length).toBe(2);
      expect(program.Statements[0].constructor.name).toBe('ExpressionStatement');
      expect(program.Statements[0].Token.constructor.name).toBe('Token');
      expect(program.Statements[0].Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(program.Statements[0].Token.Literal).toBe('foobar');
      expect(program.Statements[0].Expression.constructor.name).toBe('Identifier');
      expect(program.Statements[0].Expression.Token.Type).toBe(Token.TOKEN_TYPE.IDENT);
      expect(program.Statements[0].Expression.Token.Literal).toBe('foobar');
      expect(program.Statements[0].Expression.Value).toBe('foobar');

      expect(program.Statements[1].constructor.name).toBe('ExpressionStatement');
      expect(program.Statements[1].Token.constructor.name).toBe('Token');
      expect(program.Statements[1].Token.Type).toBe(Token.TOKEN_TYPE.INT);
      expect(program.Statements[1].Token.Literal).toBe('10');
      expect(program.Statements[1].Expression.constructor.name).toBe('IntegerLiteral');
      expect(program.Statements[1].Expression.Token.Type).toBe(Token.TOKEN_TYPE.INT);
      expect(program.Statements[1].Expression.Token.Literal).toBe('10');
      expect(program.Statements[1].Expression.Value).toBe(10);
    });
    test('parse prefix expression', () => {
      const expectations = [
        {input:'!5',operator:'!',value:5},
        {input:'-15',operator:'-',value:15},
        {input:'~0',operator:'~',value:0},
        {input:'!true',operator:'!',value:true},
        {input:'!false',operator:'!',value:false}
      ];
      for(let i = 0 ; i < expectations.length; i++){
        const p = new Parser(new Lexer(expectations[i].input));
        const program = p.ParseProgram();
        expect(program.Statements.length).toBe(1);
        expect(program.Statements[0].constructor.name).toBe('ExpressionStatement');
        expect(program.Statements[0].Expression.constructor.name).toBe('PrefixExpression');
        expect(program.Statements[0].Expression.Operator).toBe(expectations[i].operator);
        expect(program.Statements[0].Expression.Right.Token.Type).toBe(i < 3 ? Token.TOKEN_TYPE.INT :
          (expectations[i].value ? Token.TOKEN_TYPE.TRUE : Token.TOKEN_TYPE.FALSE));
        expect(program.Statements[0].Expression.Right.Value).toBe(expectations[i].value);
        expect(`${program.Statements[0].Expression}`).toBe(`(${expectations[i].input})`);
      }
    });
    test('parse infix expression', () => {
      let expectations = [
        {input:'5 + 10', left:5, operator:'+', right:10},
        {input:'5 - 10', left:5, operator:'-', right:10},
        {input:'5 * 10', left:5, operator:'*', right:10},
        {input:'5 / 10', left:5, operator:'/', right:10},
        {input:'5 > 10', left:5, operator:'>', right:10},
        {input:'5 < 10', left:5, operator:'<', right:10},
        {input:'5 == 10', left:5, operator:'==', right:10},
        {input:'5 != 10', left:5, operator:'!=', right:10}
      ];
      for(let i = 0 ; i < expectations.length; i++){
        const p = new Parser(new Lexer(`${expectations[i].input};`));
        const program = p.ParseProgram();
        expect(program.Statements.length).toBe(1);
        expect(program.Statements[0].constructor.name).toBe('ExpressionStatement');
        expect(program.Statements[0].Expression.constructor.name).toBe('InfixExpression');
        expect(program.Statements[0].Expression.Operator).toBe(expectations[i].operator);
        expect(program.Statements[0].Expression.Left.Token.Type).toBe(Token.TOKEN_TYPE.INT);
        expect(program.Statements[0].Expression.Left.Value).toBe(expectations[i].left);
        expect(program.Statements[0].Expression.Right.Token.Type).toBe(Token.TOKEN_TYPE.INT);
        expect(program.Statements[0].Expression.Right.Value).toBe(expectations[i].right);
        expect(`${program.Statements[0].Expression}`).toBe(`(${expectations[i].input})`);
      }
      expectations = [
        {input:'true == true', left:true, operator:'==', right:true},
        {input:'true != false', left:true, operator:'!=', right:false},
        {input:'false == false', left:false, operator:'==', right:false}
      ];
      for(let i = 0 ; i < expectations.length; i++){
        const p = new Parser(new Lexer(`${expectations[i].input};`));
        const program = p.ParseProgram();
        expect(program.Statements.length).toBe(1);
        expect(program.Statements[0].constructor.name).toBe('ExpressionStatement');
        expect(program.Statements[0].Expression.constructor.name).toBe('InfixExpression');
        expect(program.Statements[0].Expression.Operator).toBe(expectations[i].operator);
        expect(program.Statements[0].Expression.Left.Token.Type).toBe(expectations[i].left ?
          Token.TOKEN_TYPE.TRUE : Token.TOKEN_TYPE.FALSE);
        expect(program.Statements[0].Expression.Left.Value).toBe(expectations[i].left);
        expect(program.Statements[0].Expression.Right.Token.Type).toBe(expectations[i].right ?
          Token.TOKEN_TYPE.TRUE : Token.TOKEN_TYPE.FALSE);
        expect(program.Statements[0].Expression.Right.Value).toBe(expectations[i].right);
        expect(`${program.Statements[0].Expression}`).toBe(`(${expectations[i].input})`);
      }
      expectations = [
        {input:'-a * b', expectation:'((-a) * b)'},
        {input:'!-a', expectation:'(!(-a))'},
        {input:'a + b + c', expectation:'((a + b) + c)'},
        {input:'a + b - c', expectation:'((a + b) - c)'},
        {input:'a * b * c', expectation:'((a * b) * c)'},
        {input:'a * b / c', expectation:'((a * b) / c)'},
        {input:'a + b / c', expectation:'(a + (b / c))'},
        {input:'a + b * c + d / e - f', expectation:'(((a + (b * c)) + (d / e)) - f)'},
        {input:'3 + 4; -5 * 5', expectation:'(3 + 4)((-5) * 5)'},
        {input:'5 > 4 == 3 < 4', expectation:'((5 > 4) == (3 < 4))'},
        {input:'5 < 4 != 3 > 4', expectation:'((5 < 4) != (3 > 4))'},
        {input:'true', expectation:'true'},
        {input:'false', expectation:'false'},
        {input:'3 > 5 == false', expectation:'((3 > 5) == false)'},
        {input:'3 < 5 == true', expectation:'((3 < 5) == true)'},
        {input:'1 + (2 + 3) + 4', expectation:'((1 + (2 + 3)) + 4)'},
        {input:'(5 + 5) * 2', expectation:'((5 + 5) * 2)'},
        {input:'2 / (5 + 5)', expectation:'(2 / (5 + 5))'},
        {input:'-(5 + 5)', expectation:'(-(5 + 5))'},
        {input:'!(true == true)', expectation:'(!(true == true))'},
        {input:'if (x < y) { x }', expectation:'if (x < y) x'},
        {input:'if (x < y) { x } else { y }', expectation:'if (x < y) x else y'},
        {input:'fn(x, y) { x + y; }', expectation:'fn(x, y) (x + y)'},
        {input:'add(1, 2 * 3, 4 + 5);', expectation:'add(1, (2 * 3), (4 + 5))'}
      ];
      for(let i = 0 ; i < expectations.length; i++){
        const p = new Parser(new Lexer(`${expectations[i].input};`));
        const program = p.ParseProgram();
        expect(program.Statements[0].constructor.name).toBe('ExpressionStatement');
        expect(`${program}`).toBe(expectations[i].expectation);
      }
    });
  });
  describe('Errors', () => {
    test('check current errors', () => {
      const i = new Parser(new Lexer('let var = 10;'));
      expect(typeof i.Errors).toBe('object');
      expect(i.Errors.length).toBe(0);
    });
  });
});
