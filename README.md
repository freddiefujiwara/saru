[![Build Status](https://travis-ci.org/freddiefujiwara/saru.svg?branch=master)](https://travis-ci.org/freddiefujiwara/saru)
# saru
An interpreted language for NodeJS, based on Monkey

## Requirements
 - Node 7.6 or later

## Installation
```bash
npm i -g saru
```

## Usage for Parser
```bash
  $ saru
Hello fumikazu! This is the Monkey programming language!
Feel free to type in commands
* Please type 'bye' if you want to exit
>>>
```

## Example
```bash
>>> 1 + 2 * 3
(1 + (2 * 3))
>>>
1 * 2 - 3
((1 * 2) - 3)
>>>
false == 1
(false == 1)
```

## Usage for Lexer
```bash
  $ saru -l
Hello fumikazu! This is the Monkey programming language!
Feel free to type in commands
* Please type 'bye' if you want to exit
>>>
```

## Example
```bash
>>> let me know
Token { type: 'LET', literal: 'let' }
Token { type: 'IDENT', literal: 'me' }
Token { type: 'IDENT', literal: 'know' }
>>> let str = "string";
Token { type: 'LET', literal: 'let' }
Token { type: 'IDENT', literal: 'str' }
Token { type: '=', literal: '=' }
Token { type: 'STRING', literal: 'string' }
Token { type: ';', literal: ';' }
>>> let i = 10;
Token { type: 'LET', literal: 'let' }
Token { type: 'IDENT', literal: 'i' }
Token { type: '=', literal: '=' }
Token { type: 'INT', literal: '10' }
Token { type: ';', literal: ';' }
>>> !@
Token { type: '!', literal: '!' }
Token { type: 'ILLEGAL', literal: '@' }
```

## FAQ
[FAQ](https://github.com/freddiefujiwara/saru/wiki/FAQ)

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/freddiefujiwara/saru

## Monkey Language and Go Interpreter MIT LICENSE

Copyright (c) 2016-2017 Thorsten Ball

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
