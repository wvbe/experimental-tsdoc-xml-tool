import ts from 'typescript';
import os from 'os';

export function formatDiagnostic(diagnostic: ts.Diagnostic) {
  const message: string = ts.flattenDiagnosticMessageText(
    diagnostic.messageText,
    os.EOL
  );
  if (diagnostic.file) {
    const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start!
    );
    const formattedMessage: string = `${
      diagnostic.file.fileName
    }(${location.line + 1},${location.character +
      1})\n  [TypeScript] ${message}`;
    return formattedMessage;
  } else {
    return message;
  }
}
