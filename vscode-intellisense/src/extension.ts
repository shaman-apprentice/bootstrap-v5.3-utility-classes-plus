import * as vscode from 'vscode';
import { completionItemProvider } from './completion/completionItem.provider';
import { hoverProvider } from './completion/hover.provider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(completionItemProvider);
	context.subscriptions.push(hoverProvider);
}