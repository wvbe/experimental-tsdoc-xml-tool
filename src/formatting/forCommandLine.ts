import ts from 'typescript';
import os from 'os';
import * as tsdoc from '@microsoft/tsdoc';
import { IFoundComment } from '../types';

export function formatDiagnostic(diagnostic: ts.Diagnostic) {
	const message: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, os.EOL);
	if (diagnostic.file) {
		const pos: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(
			diagnostic.start!
		);
		const location = `${diagnostic.file.fileName}(${pos.line + 1},${pos.character + 1}`;
		return `${location})\n  [TypeScript] ${message}`;
	} else {
		return message;
	}
}

function recursiveStringifyDocNode(node: tsdoc.DocNode) {
	if (node instanceof tsdoc.DocPlainText) {
		return node.text;
	}
	if (node instanceof tsdoc.DocSoftBreak) {
		return os.EOL;
	}
	return node
		.getChildNodes()
		.map<string>(recursiveStringifyDocNode)
		.join('');
}

export function formatFoundComment(parser: tsdoc.TSDocParser, foundComment: IFoundComment) {
	const parserContext = parser.parseRange(foundComment.textRange);
	return recursiveStringifyDocNode(parserContext.docComment).trim();
	// console.dir(parserContext);
	// const sourceFile = foundComment.compilerNode.getSourceFile();
	// let formattedMessage = '';
	// for (const message of parserContext.docComment.) {
	// 	// Since we have the compiler's analysis, use it to calculate the line/column information,
	// 	// since this is currently faster than TSDoc's TextRange.getLocation() lookup.
	// 	const location = sourceFile.getLineAndCharacterOfPosition(message.textRange.pos);
	// 	formattedMessage += `$$$$$$${sourceFile.fileName}(${location.line +
	// 		1},${location.character + 1}): [TSDoc] ${message}`;
	// }
	// return formattedMessage;
}
