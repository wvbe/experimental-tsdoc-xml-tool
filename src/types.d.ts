import * as ts from 'typescript';
interface IFoundComment {
	compilerNode: ts.Node;
	textRange: tsdoc.TextRange;
}
