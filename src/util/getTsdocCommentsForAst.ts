import * as ts from 'typescript';
import * as tsdoc from '@microsoft/tsdoc';
import { getJSDocCommentRanges } from './getJsdocCommentRanges';
import { isDeclarationKind } from './isDeclarationKind';
import { IFoundComment } from '../types';

/**
 * Recursively fids all TSDoc comments for an AST node.
 *
 * Function copied and adapted from `walkCompilerAstAndFindComments`:
 * https://github.com/microsoft/tsdoc/blob/master/api-demo/src/advancedDemo.ts#L85
 */
export function getTsdocCommentsForAst(node: ts.Node, indent: string) {
  const foundComments: IFoundComment[] = [];
  // The TypeScript AST doesn't store code comments directly.  If you want to find *every* comment,
  // you would need to rescan the SourceFile tokens similar to how tsutils.forEachComment() works:
  // https://github.com/ajafff/tsutils/blob/v3.0.0/util/util.ts#L453
  //
  // However, for this demo we are modeling a tool that discovers declarations and then analyzes their doc comments,
  // so we only care about TSDoc that would conventionally be associated with an interesting AST node.

  const buffer: string = node.getSourceFile().getFullText(); // don't use getText() here!

  // Only consider nodes that are part of a declaration form.  Without this, we could discover
  // the same comment twice (e.g. for a MethodDeclaration and its PublicKeyword).
  if (isDeclarationKind(node.kind)) {
    // Find "/** */" style comments associated with this node.
    // Note that this reinvokes the compiler's scanner -- the result is not cached.
    const comments: ts.CommentRange[] = getJSDocCommentRanges(node, buffer);

    if (comments.length > 0) {
      for (const comment of comments) {
        foundComments.push({
          compilerNode: node,
          textRange: tsdoc.TextRange.fromStringRange(
            buffer,
            comment.pos,
            comment.end
          ),
        });
      }
    }
  }

  // @TODO Probably not flatten here
  node.forEachChild(child => {
    foundComments.splice(
      foundComments.length,
      0,
      ...getTsdocCommentsForAst(child, indent + '  ')
    );
  });

  return foundComments;
}
