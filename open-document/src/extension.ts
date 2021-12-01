import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "open-document" is now active!');
	
	let disposable = vscode.commands.registerCommand('open-document.helloWorld', async () => {
		
const formatted_contents = 'hello';

const doc: vscode.TextDocument = await vscode.workspace.openTextDocument({ 'content': formatted_contents, 'language':'python'});

const current_view_column = vscode.window.activeTextEditor?.viewColumn;
const results_view_column = current_view_column === vscode.ViewColumn.One ? vscode.ViewColumn.Two : current_view_column; 

const editor = await vscode.window.showTextDocument(doc, results_view_column);
await editor.edit(edit => edit.insert(new vscode.Position(0,0), formatted_contents));
editor.selection= new vscode.Selection(0,0,0,0);

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
