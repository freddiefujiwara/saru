#!/usr/bin/env node

const pkg = require('../package');
const Lexer = require('../index').Lexer;
const Token = require('../index').Token;
const ReadlineSync = require('readline-sync');
const os = require('os');

function main () {
  console.log(`Hello ${os.userInfo().username}! This is the Monkey programming language!`);
  console.log("Feel free to type in commands");
  console.log("* Please type 'bye' if you want to exit ");
  ReadlineSync.setDefaultOptions({prompt: '>>> '});
  ReadlineSync.promptLoop(function(input){
    let l = new Lexer(input);
    for(let t = l.NextToken();
      Token.TOKEN_TYPE.EOF !== t.Type ; t = l.NextToken()){
      console.log(`${t}`);
    }
    return "bye" === input;
  });
}

main();
