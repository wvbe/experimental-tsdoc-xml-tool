import * as ts from 'typescript';
import { IFoundComment } from './types';
import { getTsdocCommentsForAst } from './util/getTsdocCommentsForAst';
import { getTsdocParser } from './util/getTsdocParser';

export function runForFiles(inputFileNames: string[], compilerOptions: ts.CompilerOptions) {
	const program = ts.createProgram(inputFileNames, compilerOptions);
	const tsdocParser = getTsdocParser();

	return {
		// getSemanticDiagnistic should be ran before anything else, in order to avoid the error that Node#getSourceNode
		//   return nothing, later on.
		diagnostics: program.getSemanticDiagnostics(),

		// TSDoc comment nodes
		comments: inputFileNames.reduce<IFoundComment[]>(
			(all, inputFileName) => all.concat(runForFile(program, inputFileName)),
			[]
		),

		parser: tsdocParser
	};
}

function runForFile(program: ts.Program, inputFileName: string) {
	const sourceFile = program.getSourceFile(inputFileName);
	if (!sourceFile) {
		throw new Error('Error retrieving source file');
	}

	return getTsdocCommentsForAst(sourceFile);
}
