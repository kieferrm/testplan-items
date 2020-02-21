import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "hello-again" is now active!');

	vscode.window.registerUriHandler({
		handleUri(uri: vscode.Uri) {
			let cmd = uri.path.substr(1);
			vscode.window.showInformationMessage(`Hello Again invoked: with ${uri.toString()}`);
			vscode.commands.executeCommand(cmd);
		}
	});

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		let ext = vscode.extensions.getExtension('kieferrm.hello-again');
		if (ext) {
			vscode.window.showInformationMessage(`Hello Again from the ${getExtensionKind(ext)}`);
		} else {
			vscode.window.showInformationMessage(`Nothing from Hello Again`);
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
