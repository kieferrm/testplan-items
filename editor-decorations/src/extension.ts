import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const beforeType = vscode.window.createTextEditorDecorationType({
		before: {
			contentText: 'before',
			color: '#e54910'
		}
	});
	const afterType = vscode.window.createTextEditorDecorationType({
		after: {
			contentText: 'after',
			color: '#7ba7ce'
		}
	});


	let disposable = vscode.commands.registerCommand('extension.setBeforeDecoration', () => {
		const selection = vscode.window.activeTextEditor?.selection;
		const position = selection?.start
		if (position) {
			const range = new vscode.Range(position, position);
			vscode.window.activeTextEditor?.setDecorations(beforeType, [range]);
		}
	});
	context.subscriptions.push(disposable);
	
	disposable = vscode.commands.registerCommand('extension.setAfterDecoration', () => {
		const selection = vscode.window.activeTextEditor?.selection;
		const position = selection?.start
		if (position) {
			const range = new vscode.Range(position, position);
			vscode.window.activeTextEditor?.setDecorations(afterType, [range]);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('extension.removeDecorations', () => {
		vscode.window.activeTextEditor?.setDecorations(beforeType, []);
		vscode.window.activeTextEditor?.setDecorations(afterType, []);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
