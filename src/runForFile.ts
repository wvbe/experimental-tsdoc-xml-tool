import * as ts from 'typescript';
import os from 'os';
import { getTsdocCommentsForAst } from './util/getTsdocCommentsForAst';
import { getTsdocParser } from './util/getTsdocParser';
import { getXmlForTsdocComments } from './util/getXmlForTsdocComment';

function getCompilerErrors(program: ts.Program) {
  const errors = [];
  // Report any compiler errors
  const compilerDiagnostics: ReadonlyArray<ts.Diagnostic> = program.getSemanticDiagnostics();
  if (compilerDiagnostics.length > 0) {
    for (const diagnostic of compilerDiagnostics) {
      const message: string = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        os.EOL
      );
      if (diagnostic.file) {
        const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        );
        const formattedMessage: string =
          `${diagnostic.file.fileName}(${location.line +
            1},${location.character + 1}):` + ` [TypeScript] ${message}`;
        errors.push(formattedMessage);
      } else {
        errors.push(message);
      }
    }
  }
  return errors;
}

export function runForFile(
  inputFileName: string,
  compilerOptions: ts.CompilerOptions
) {
  const program: ts.Program = ts.createProgram(
    [inputFileName],
    compilerOptions
  );
  const errors = getCompilerErrors(program);

  console.group(`Compiler errors (${errors.length}):`);
  errors.forEach(error => console.log(`> ${error}`));
  console.groupEnd();

  const sourceFile: ts.SourceFile | undefined = program.getSourceFile(
    inputFileName
  );
  if (!sourceFile) {
    throw new Error('Error retrieving source file');
  }

  const foundComments = getTsdocCommentsForAst(sourceFile, '');

  const tsdocParser = getTsdocParser();
  return foundComments.map(foundComment =>
    getXmlForTsdocComments(tsdocParser, foundComment)
  );
}
