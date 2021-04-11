import * as ts from 'typescript';
/**
 * Returns true if the specified SyntaxKind is part of a declaration form.
 *
 * Based on ts.isDeclarationKind() from the compiler.
 * https://github.com/microsoft/TypeScript/blob/v3.0.3/src/compiler/utilities.ts#L6382
 *
 * Function copied from:
 * https://github.com/microsoft/tsdoc/blob/master/api-demo/src/advancedDemo.ts#L13
 */
export function isDeclarationKind(tsNodeKind: ts.SyntaxKind): boolean {
  return (
    tsNodeKind === ts.SyntaxKind.ArrowFunction ||
    tsNodeKind === ts.SyntaxKind.BindingElement ||
    tsNodeKind === ts.SyntaxKind.ClassDeclaration ||
    tsNodeKind === ts.SyntaxKind.ClassExpression ||
    tsNodeKind === ts.SyntaxKind.Constructor ||
    tsNodeKind === ts.SyntaxKind.EnumDeclaration ||
    tsNodeKind === ts.SyntaxKind.EnumMember ||
    tsNodeKind === ts.SyntaxKind.ExportSpecifier ||
    tsNodeKind === ts.SyntaxKind.FunctionDeclaration ||
    tsNodeKind === ts.SyntaxKind.FunctionExpression ||
    tsNodeKind === ts.SyntaxKind.GetAccessor ||
    tsNodeKind === ts.SyntaxKind.ImportClause ||
    tsNodeKind === ts.SyntaxKind.ImportEqualsDeclaration ||
    tsNodeKind === ts.SyntaxKind.ImportSpecifier ||
    tsNodeKind === ts.SyntaxKind.InterfaceDeclaration ||
    tsNodeKind === ts.SyntaxKind.JsxAttribute ||
    tsNodeKind === ts.SyntaxKind.MethodDeclaration ||
    tsNodeKind === ts.SyntaxKind.MethodSignature ||
    tsNodeKind === ts.SyntaxKind.ModuleDeclaration ||
    tsNodeKind === ts.SyntaxKind.NamespaceExportDeclaration ||
    tsNodeKind === ts.SyntaxKind.NamespaceImport ||
    tsNodeKind === ts.SyntaxKind.Parameter ||
    tsNodeKind === ts.SyntaxKind.PropertyAssignment ||
    tsNodeKind === ts.SyntaxKind.PropertyDeclaration ||
    tsNodeKind === ts.SyntaxKind.PropertySignature ||
    tsNodeKind === ts.SyntaxKind.SetAccessor ||
    tsNodeKind === ts.SyntaxKind.ShorthandPropertyAssignment ||
    tsNodeKind === ts.SyntaxKind.TypeAliasDeclaration ||
    tsNodeKind === ts.SyntaxKind.TypeParameter ||
    tsNodeKind === ts.SyntaxKind.VariableDeclaration ||
    tsNodeKind === ts.SyntaxKind.JSDocTypedefTag ||
    tsNodeKind === ts.SyntaxKind.JSDocCallbackTag ||
    tsNodeKind === ts.SyntaxKind.JSDocPropertyTag
  );
}
