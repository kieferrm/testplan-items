import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "hello-again" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld2', () => {
		let ext = vscode.extensions.getExtension('kieferrm.hello-again-2');
		if (ext) {
			vscode.window.showInformationMessage(`Hello Again 2 from the ${getExtensionKind(ext)}`);
		} else {
			vscode.window.showInformationMessage(`Nothing from Hello Again 2`);
		}
	});

	context.subscriptions.push(disposable);
}

function getExtensionKind(ext: vscode.Extension<any>) {
	switch (ext.extensionKind) {
		case 1:
			return 'UI';
		case 2:
			return 'Workspace';
		default:
			return 'Unknown';
	}
}
export function deactivate() { }
