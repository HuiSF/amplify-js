// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
	createAmplifyServerContext,
	destroyAmplifyServerContext,
} from './serverContext';
import { AmplifyServer } from './types';

/**
 * The low level function that supports framework specific helpers.
 * It creates an Amplify server context based on the input and runs the operation
 * with injecting the context, and finally returns the result of the operation.
 *
 * @param input The require input to call runWithAmplifyServerContext.
 * @param input.tokenProvider The token provider that is provided by the framework
 *   specific helper implementation.
 * @param input.credentialsProvider The credentials provider that is provided by
 *   the framework specific helper implementation.
 * @param input.operation The function to run within the Amplify server context.
 * @returns The result returned by `input.operation`.
 */
export const runWithAmplifyServerContext: AmplifyServer.RunWithContext =
	async ({ amplifyConfig, tokenProvider, credentialsProvider, operation }) => {
		const contextSpec = createAmplifyServerContext({
			amplifyConfig,
			tokenProvider,
			credentialsProvider,
		});

		// run the operation with injecting the context
		const result = await operation(contextSpec);

		destroyAmplifyServerContext(contextSpec);

		return result;
	};
