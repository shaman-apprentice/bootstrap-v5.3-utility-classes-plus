import * as vscode from 'vscode';
import { isOffsetPossiblyInAClass } from './utils/isOffsetPossiblyInAClass';
import intellisenseItems from "../intellisenseItems.json";
import { getHoveredWord } from './utils/getHoveredWord';

export const hoverProvider = vscode.languages.registerHoverProvider(
  ['html', 'javascriptreact', 'typescriptreact'],
  {
    provideHover: (document, position, token) => {
      const documentText = document.getText();
      const documentOffset = document.offsetAt(position)
      if (!isOffsetPossiblyInAClass(documentText, documentOffset))
        return null;

      const hoveredWord = getHoveredWord(documentText, documentOffset);
      if (hoveredWord === null)
        return null;

      const item = intellisenseItems.find(item => item.label === hoveredWord);
      if (item === undefined)
        return null;

      const hoverInfo = new vscode.MarkdownString().appendCodeblock(item.markdownDoc, "css");
      return new vscode.Hover(hoverInfo);
    }
  }
);
