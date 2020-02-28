import * as vscode from 'vscode';

async function getCachedSesssion(provider: vscode.AuthenticationProvider): Promise<vscode.AuthenticationSession | undefined> {
	const sessions = await provider.getSessions();
	return sessions.length ? sessions[0] : undefined;
}

const ProviderID = 'github';
async function showSession() {
	const provider = vscode.authentication.providers.find(provider => provider.id === ProviderID);
	if (provider) {
		const session = await getCachedSesssion(provider);
		await doShowSession(session);
	}
}

async function showSessions() {
	const provider = vscode.authentication.providers.find(provider => provider.id === ProviderID);
	if (provider) {
		const sessions = await provider.getSessions();
		if (sessions.length) {
			sessions.forEach(async s => await doShowSession(s))
		} else {
			await doShowSession(undefined);
		}
	}
}

async function doShowSession(session: vscode.AuthenticationSession | undefined) {
	if (session) {
		const token = await session!.getAccessToken();
		vscode.window.showInformationMessage(`Session: ${session.id} | ${session.accountName} | ${token}`);
	}
	else {
		vscode.window.showInformationMessage(`No session available.`);
	}
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('github-auth.showSessions', async () => {
		await showSessions();
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('github-auth.login', async () => {
		const provider = vscode.authentication.providers.find(provider => provider.id === ProviderID);
		if (provider) {
			const session = await provider.login(['user:email']);
			vscode.window.showInformationMessage(`Session ${session.id} started`);
		}
	});
	context.subscriptions.push(disposable);


	disposable = vscode.commands.registerCommand('github-auth.logout', async () => {
		const provider = vscode.authentication.providers.find(provider => provider.id === ProviderID);
		if (provider) {
			const session = await getCachedSesssion(provider);
			if (session) {
				await provider.logout(session.id);
				vscode.window.showInformationMessage(`Session ${session!.id} logged out`);
			} else
				vscode.window.showInformationMessage(`No active session.`);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.authentication.onDidChangeAuthenticationProviders(async changed => {
		if (changed.added.includes(ProviderID)) {
			showSession();
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
