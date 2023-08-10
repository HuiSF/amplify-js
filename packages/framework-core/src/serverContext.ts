// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AmplifyClassV6 } from '@aws-amplify/core';
import { AmplifyServer } from './types';
import { serverContextRegistry } from './serverContextRegistry';

/**
 * Creates an Amplify server context.
 * @param input The required input to create a Amplify server context.
 * @param input.amplifyConfig The Amplify configuration.
 * @param input.cookieStorageAdapter The cookie storage adapter that allows Amplify to perform
 *  cookie related operations.
 * @returns The Amplify server context spec.
 */
export const createAmplifyServerContext = (
	input: AmplifyServer.CreateContextInput
): AmplifyServer.ContextSpec => {
	const { amplifyConfig, tokenProvider, credentialsProvider } = input;
	const amplify = new AmplifyClassV6();
	amplify.configure(amplifyConfig, {
		Auth: {
			tokenProvider,
			credentialsProvider,
		},
	});

	return serverContextRegistry.register({
		amplify,
	});
};

/**
 * Returns an Amplify server context.
 * @param contextSpec The context spec used to get the Amplify server context.
 * @returns The Amplify server context.
 */
export const getAmplifyServerContext = (
	contextSpec: AmplifyServer.ContextSpec
): AmplifyServer.Context => {
	const context = serverContextRegistry.get(contextSpec);

	if (context) {
		return context;
	}

	throw new Error(
		'Attempted to get the Amplify Server Context that may have been destroyed.'
	);
};

/**
 * Destroys an Amplify server context.
 * @param contextSpec The context spec used to destroy the Amplify server context.
 */
export const destroyAmplifyServerContext = (
	contextSpec: AmplifyServer.ContextSpec
): void => {
	serverContextRegistry.deregister(contextSpec);
};
