import { Subject } from 'rxjs';
import { Amplify, Logger, Hub } from '@aws-amplify/core';
import { AuthState } from './auth.state';
import * as _ from 'lodash';

const logger = new Logger('AuthDecorator');

function check(authState: Subject<AuthState>, Auth) {
	// check for current authenticated user to init authState
	Auth.currentAuthenticatedUser()
		.then(user => {
			authState.next({ state: 'signedIn', user });
		})
		.catch(err => {
			authState.next({ state: 'signedOut', user: null });
		});
}

function listen(authState: Subject<AuthState>) {
	const config = Amplify.configure(null);
	if (_.has(config, 'Auth.oauth')) {
		Hub.listen(
			'auth',
			{
				onHubCapsule: capsule => {
					const { channel, payload } = capsule;
					if (channel === 'auth') {
						const { username } = payload.data;

						authState.next({ state: payload.event, user: { username } });
					}
				},
			},
			'angularAuthListener'
		);
	}
}

function decorateSignIn(authState: Subject<AuthState>, Auth) {
	const _signIn = Auth.signIn;
	Auth.signIn = (username: string, password: string): Promise<any> => {
		return _signIn
			.call(Auth, username, password)
			.then(user => {
				if (!user.challengeName) {
					authState.next({ state: 'signedIn', user });
					return user;
				}

				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					authState.next({ state: 'requireNewPassword', user });
				} else if (user.challengeName === 'MFA_SETUP') {
					authState.next({ state: 'setupMFA', user });
				} else if (
					user.challengeName === 'SMS_MFA' ||
					user.challengeName === 'SOFTWARE_TOKEN_MFA'
				) {
					authState.next({ state: 'confirmSignIn', user });
				} else {
					logger.debug(
						'warning: unhandled challengeName ' + user.challengeName
					);
				}
				return user;
			})
			.catch(err => {
				throw err;
			});
	};
}

function decorateSignOut(authState: Subject<AuthState>, Auth) {
	const _signOut = Auth.signOut;
	Auth.signOut = (opts: { global: boolean } | undefined): Promise<any> => {
		return _signOut
			.call(Auth, opts)
			.then(data => {
				authState.next({ state: 'signedOut', user: null });
				return data;
			})
			.catch(err => {
				throw err;
			});
	};
}

function decorateSignUp(authState: Subject<AuthState>, Auth) {
	const _signUp = Auth.signUp;
	Auth.signUp = (
		username: string,
		password: string,
		email: string,
		phone_number: string
	): Promise<any> => {
		return _signUp
			.call(Auth, username, password, email, phone_number)
			.then(data => {
				authState.next({ state: 'confirmSignUp', user: { username } });
				return data;
			})
			.catch(err => {
				throw err;
			});
	};
}

function decorateConfirmSignUp(authState: Subject<AuthState>, Auth) {
	const _confirmSignUp = Auth.confirmSignUp;
	Auth.confirmSignUp = (username: string, code: string): Promise<any> => {
		return _confirmSignUp
			.call(Auth, username, code)
			.then(data => {
				authState.next({ state: 'signIn', user: { username } });
				return data;
			})
			.catch(err => {
				throw err;
			});
	};
}

export function authDecorator(authState: Subject<AuthState>, authModule) {
	check(authState, authModule);
	listen(authState);
	decorateSignIn(authState, authModule);
	decorateSignOut(authState, authModule);
	decorateSignUp(authState, authModule);
	decorateConfirmSignUp(authState, authModule);
}
