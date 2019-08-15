#!/usr/bin/env node

const pkg = require('../package');
const Lexer = require('../index').Lexer;
const Token = require('../index').Token;
const Parser = require('../index').Parser;
const ReadlineSync = require('readline-sync');
const Commander = require('commander');
const os = require('os');

Commander
  .version(pkg.version)
  .description(pkg.description)
  .option('-l, --lexer', 'run lexer');
Commander.parse(process.argv);
console.log(`Hello ${os.userInfo().username}! This is the Monkey programming language!`);
console.log("Feel free to type in commands");
console.log("* Please type 'bye' if you want to exit ");
ReadlineSync.setDefaultOptions({prompt: '>>> '});
ReadlineSync.promptLoop(function(input){
  if(Commander.lexer){
    const l = new Lexer(input);
    for(let t = l.NextToken();
      Token.TOKEN_TYPE.EOF !== t.Type ; t = l.NextToken()){
      console.log(`${t}`);
    }
  } else {
    const psr = new Parser( new Lexer(input));
    const p = psr.ParseProgram();
    if(0 < psr.Errors.length) {
      console.log(`${psr.Errors}`);
      return false;
    }
    console.log(`${p}`);
  }
  return "bye" === input;
});
