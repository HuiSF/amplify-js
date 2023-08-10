import { AmplifyClassV6 } from '@aws-amplify/core';
import {
	AmplifyServerContextSpec,
	CreateAmplifyServerContextInput,
} from './types';
import { serverContextRegistry } from './serverContextRegistry';
import { createKeyValueStorageFromCookiesStorageAdapter } from './keyValueStorage';

/**
 * Creates an Amplify server context.
 * @param input The required input to create a Amplify server context.
 * @param input.amplifyConfig The Amplify configuration.
 * @param input.cookiesStorageAdapter The cookies storage adapter that allows Amplify to perform
 *  cookie related operations.
 * @returns The Amplify server context spec.
 */
export function createAmplifyServerContext(
	input: CreateAmplifyServerContextInput
) {
	const { amplifyConfig, cookiesStorageAdapter } = input;
	const amplifyClient = new AmplifyClassV6();
	amplifyClient.configure(amplifyConfig, {
		Auth: {
			// Using default credentials provider and token refresher
			// If Framework provides a cookiesStorageAdapter, use it as the
			//   underlying key value storage, otherwise use the default MemoryKeyValueStorage ()
			//   (for using authenticate role)
			// TODO(HuiSF): follow up custom providers configuration
			keyValueStorage:
				cookiesStorageAdapter &&
				createKeyValueStorageFromCookiesStorageAdapter(cookiesStorageAdapter),
		},
	});

	return serverContextRegistry.register({
		client: amplifyClient,
	});
}

/**
 * Returns an Amplify server context.
 * @param contextSpec The context spec used to get the Amplify server context.
 * @returns The Amplify server context.
 */
export function getAmplifyServerContext(contextSpec: AmplifyServerContextSpec) {
	const context = serverContextRegistry.get(contextSpec);

	if (context) {
		return context;
	}

	throw new Error(
		'Attempted to get the Amplify Server Context that may have been destroyed.'
	);
}

/**
 * Destroys an Amplify server context.
 * @param contextSpec The context spec used to destroy the Amplify server context.
 */
export function destroyAmplifyServerContext(
	contextSpec: AmplifyServerContextSpec
) {
	serverContextRegistry.deregister(contextSpec);
}
