// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import {
	LibraryOptions,
	LegacyConfig,
	ResourcesConfig,
	Amplify,
	LocalStorage,
	CookieStorage,
	parseAWSExports,
} from '@aws-amplify/core';
import {
	CognitoUserPoolsTokenProvider,
	cognitoCredentialsProvider,
} from './auth/cognito';

export const DefaultAmplify = {
	configure(
		resourceConfig: ResourcesConfig | LegacyConfig,
		libraryOptions?: LibraryOptions
	) {
		let resolvedResourceConfig: ResourcesConfig;
		if (Object.keys(resourceConfig).some(key => key.startsWith('aws_'))) {
			resolvedResourceConfig = parseAWSExports(resourceConfig);
		} else {
			resolvedResourceConfig = resourceConfig as ResourcesConfig;
		}
		// When Auth config is provided but no custom Auth provider defined
		// use the default Auth Providers
		if (resolvedResourceConfig.Auth && !libraryOptions?.Auth) {
			CognitoUserPoolsTokenProvider.setAuthConfig(resolvedResourceConfig.Auth);

			const libraryOptionsWithDefaultAuthProviders: LibraryOptions = {
				...libraryOptions,
				Auth: {
					tokenProvider: CognitoUserPoolsTokenProvider,
					credentialsProvider: cognitoCredentialsProvider,
				},
			};

			CognitoUserPoolsTokenProvider.setKeyValueStorage(
				libraryOptions?.ssr
					? new CookieStorage({
							sameSite: 'strict',
					  })
					: LocalStorage
			);

			Amplify.configure(resourceConfig, libraryOptionsWithDefaultAuthProviders);
		} else {
			Amplify.configure(resourceConfig, libraryOptions);
		}
	},
	getConfig(): ResourcesConfig {
		return Amplify.getConfig();
	},
};
