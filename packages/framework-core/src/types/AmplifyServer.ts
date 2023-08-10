// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
	AWSCredentialsAndIdentityIdProvider,
	AmplifyClassV6,
	ResourcesConfig,
	TokenProvider,
} from '@aws-amplify/core';

export namespace AmplifyServer {
	export type ContextToken = {
		readonly value: Symbol;
	};

	export type ContextSpec = {
		readonly token: ContextToken;
	};

	export type Context = {
		amplify: AmplifyClassV6;
	};

	export interface CreateContextInput {
		/**
		 * The Amplify configuration object.
		 */
		amplifyConfig: ResourcesConfig;

		/**
		 * The implementation of {@link TokenProvider}.
		 */
		tokenProvider: TokenProvider;

		/**
		 * The implementation of {@link AWSCredentialsAndIdentityIdProvider}.
		 */
		credentialsProvider: AWSCredentialsAndIdentityIdProvider;
	}

	export interface RunWithContext {
		<Result>(
			input: CreateContextInput & {
				operation: (
					contextSpec: ContextSpec
				) => Result | void | Promise<Result | void>;
			}
		): Promise<Result | void>;
	}
}
