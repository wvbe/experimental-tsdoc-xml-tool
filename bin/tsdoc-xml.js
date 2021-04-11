#!/usr/bin/env node
const ts = require('typescript');
const run = require('../dist').default;
const path = require('path');

(async ([fileName]) => {
  const inputFileName = path.resolve(process.cwd(), fileName);
  console.log('TSDOC-XML');
  console.group('Parameters:');
  console.log(`File:\t${inputFileName}`);
  console.groupEnd();
  try {
    const out = run(inputFileName, {
      target: ts.ScriptTarget.ES5,

      compilerOptions: {
        lib: 'es2015',
        // noImplicitAny: true,
        // removeComments: true,
        // preserveConstEnums: true,
        // sourceMap: true,
      },
    });
    console.group('Output:');
    console.dir(out);
    console.groupEnd();
  } catch (error) {
    console.group('Run error:');
    console.log(error.stack);
    console.groupEnd();
  }
})(process.argv.slice(2));
