import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('ext-kind.helloWorld', () => {
		vscode.window.showInformationMessage(`My remote name ${vscode.env.remoteName}`);

		const ext = vscode.extensions.getExtension('kieferrm.ext-kind');
		if (ext) {
			vscode.window.showInformationMessage(`My extension kind ${ext.extensionKind === vscode.ExtensionKind.UI ? 'UI' : 'Workspace'}`);
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
