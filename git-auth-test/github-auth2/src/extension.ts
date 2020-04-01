import * as vscode from 'vscode';

const ProviderID = 'github';
const oauthScopes = ['user:email'];
const vsoScopes = ['vso'];


async function doShowSession(session: vscode.AuthenticationSession | undefined) {
	if (session) {
		const token = await session!.getAccessToken();
		vscode.window.showInformationMessage(`2: Session: ${session.id} | ${session.accountName} | ${token}`);
	}
	else {
		vscode.window.showInformationMessage(`2: No session available.`);
	}
}

async function showSessions(scopes: string[]) {
		const sessions = await vscode.authentication.getSessions(ProviderID, scopes);
		if (sessions.length) {
			sessions.forEach(async s => await doShowSession(s))
		} else {
			doShowSession(undefined);
		}
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('github-auth2.oauth-login', async () => {
		const session = await vscode.authentication.login(ProviderID, oauthScopes);
		vscode.window.showInformationMessage(`2: OAuth session ${session.id} started`);
	});
	context.subscriptions.push(disposable);
	
	disposable = vscode.commands.registerCommand('github-auth2.oauth-sessions', async () => {
		await showSessions(oauthScopes);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('github-auth2.vso-login', async () => {
		const session = await vscode.authentication.login(ProviderID, vsoScopes);
		vscode.window.showInformationMessage(`2: VSO session ${session.id} started`);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('github-auth2.vso-sessions', async () => {
		await showSessions(vsoScopes);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.authentication.onDidChangeAuthenticationProviders(async changed => {
		if (changed.added.includes(ProviderID)) {
			[oauthScopes, vsoScopes].forEach(s => showSessions(s));
		} else if (changed.removed.includes(ProviderID)) {
			vscode.window.showInformationMessage(`2: Sessions killed`);
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
