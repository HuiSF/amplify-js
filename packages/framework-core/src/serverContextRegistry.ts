import { AmplifyClassV6 } from '@aws-amplify/core';
import {
	AmplifyServerContext,
	AmplifyServerContextSpec,
	AmplifyServerContextToken,
} from './types';

const _serverContextRegistry = new WeakMap<
	AmplifyServerContextToken,
	AmplifyServerContext
>();

function createToken(): AmplifyServerContextToken {
	return {
		value: Symbol('AmplifyServerContextToken'),
	};
}

export const serverContextRegistry = {
	register(context: AmplifyServerContext): AmplifyServerContextSpec {
		const token = createToken();
		_serverContextRegistry.set(token, context);
		return { token };
	},
	deregister(contextSpec: AmplifyServerContextSpec) {
		return _serverContextRegistry.delete(contextSpec.token);
	},
	get(contextSpec: AmplifyServerContextSpec) {
		return _serverContextRegistry.get(contextSpec.token);
	},
};
