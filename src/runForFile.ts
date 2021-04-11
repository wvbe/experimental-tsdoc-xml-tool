import * as tsdoc from '@microsoft/tsdoc';
import * as ts from 'typescript';
import { getTsdocCommentsForAst } from './util/getTsdocCommentsForAst';
import { getTsdocParser } from './util/getTsdocParser';
import { getXmlForTsdocComments } from './util/getXmlForTsdocComment';

export function runForFiles(
  inputFileNames: string[],
  compilerOptions: ts.CompilerOptions
) {
  const program = ts.createProgram(inputFileNames, compilerOptions);
  const tsdocParser = getTsdocParser();

  return {
    documents: inputFileNames.reduce<tsdoc.DocComment[]>(
      (all, inputFileName) =>
        all.concat(runForFile(program, tsdocParser, inputFileName)),
      []
    ),
    diagnostics: program.getSemanticDiagnostics(),
  };
}

function runForFile(
  program: ts.Program,
  tsdocParser: tsdoc.TSDocParser,
  inputFileName: string
) {
  const sourceFile = program.getSourceFile(inputFileName);
  if (!sourceFile) {
    throw new Error('Error retrieving source file');
  }

  return getTsdocCommentsForAst(sourceFile).map(foundComment =>
    getXmlForTsdocComments(tsdocParser, foundComment)
  );
}
