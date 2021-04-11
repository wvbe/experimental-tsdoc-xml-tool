#!/usr/bin/env node
const ts = require('typescript');
const run = require('../dist').default;
const formatting = require('../dist').formatting;
const path = require('path');

function formatDiagnostic(diagnostic) {}

(async ([...fileNames]) => {
  const inputFileNames = fileNames.map(fileName =>
    path.resolve(process.cwd(), fileName)
  );
  console.log('TSDOC-XML');
  console.group('Files:');
  inputFileNames.forEach(fileName => console.log(fileName));
  console.groupEnd();
  try {
    const { diagnostics, documents } = run(inputFileNames, {
      compilerOptions: {
        lib: 'es2015',
      },
    });
    console.group('Output:');
    console.dir(documents);
    console.groupEnd();
    console.group(`Compiler diagnostics (${diagnostics.length}):`);
    diagnostics.forEach(error =>
      console.log(`> ${formatting.formatDiagnostic(error)}`)
    );
    console.groupEnd();
  } catch (error) {
    console.group('Run error:');
    console.log(error.stack);
    console.groupEnd();
  }
})(process.argv.slice(2));
