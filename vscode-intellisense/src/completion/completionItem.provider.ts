import * as vscode from 'vscode';
import { isOffsetPossiblyInAClass } from './utils/isOffsetPossiblyInAClass';
import intellisenseItems from "../intellisenseItems.json";


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

      return intellisenseItems.map(item => {
        const result = new vscode.CompletionItem(item.label)
        result.documentation = new vscode.MarkdownString().appendCodeblock(item.markdownDoc, 'css');
        result.insertText = item.label;
        result.kind = vscode.CompletionItemKind.Constant;
        return result;
      });
    }
  }
);
