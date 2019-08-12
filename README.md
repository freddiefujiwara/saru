[![Build Status](https://travis-ci.org/freddiefujiwara/saru.svg?branch=master)](https://travis-ci.org/freddiefujiwara/saru)
# saru
An interpreted language for NodeJS, based on Monkey

## Requirements
 - Node 7.6 or later

## Installation
```bash
npm i -g saru
```

## Usage
```bash                                                                                     
  $ saru                                                                                                                                 
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
