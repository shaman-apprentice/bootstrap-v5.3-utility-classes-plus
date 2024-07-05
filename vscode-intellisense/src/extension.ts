import * as vscode from 'vscode';
import { completionItemProvider } from './completion/completionItem.provider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(completionItemProvider);
}