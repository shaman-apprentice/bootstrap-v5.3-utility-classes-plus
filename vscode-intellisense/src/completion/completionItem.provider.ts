import * as vscode from 'vscode';
import { isOffsetPossiblyInAClass } from './utils/isOffsetPossiblyInAClass';

export const completionItemProvider = vscode.languages.registerCompletionItemProvider(
  'html',
  {
    provideCompletionItems: (
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) => {
      if (!isOffsetPossiblyInAClass(document.getText(), document.offsetAt(position)))
        return null;



      const commitCharacterCompletion = new vscode.CompletionItem('console');
      commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

      const commitCharacterCompletion2 = new vscode.CompletionItem('abc');
      commitCharacterCompletion2.documentation = new vscode.MarkdownString('Press `.` to get `abc.`');

      return [commitCharacterCompletion, commitCharacterCompletion2];
  }
});
