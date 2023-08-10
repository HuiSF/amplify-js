// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { runWithAmplifyServerContext } from '../src';
import {
	createAmplifyServerContext,
	destroyAmplifyServerContext,
} from '../src/serverContext';

// mock serverContext
jest.mock('../src/serverContext');
const mockCreateAmplifyServerContext = createAmplifyServerContext as jest.Mock;
const mockDestroyAmplifyServerContext =
	destroyAmplifyServerContext as jest.Mock;
const mockAmplifyConfig = {};
const mockTokenProvider = {
	getTokens: jest.fn(),
};
const mockCredentialAndIdentityProvider = {
	getCredentialsAndIdentityId: jest.fn(),
	clearCredentials: jest.fn(),
};
const mockContextSpec = {
	token: { value: Symbol('AmplifyServerContextToken') },
};

describe('runWithAmplifyServerContext', () => {
	beforeEach(() => {
		mockCreateAmplifyServerContext.mockReturnValueOnce(mockContextSpec);
	});

	it('should run the operation with the context', () => {
		const mockOperation = jest.fn();
		runWithAmplifyServerContext({
			amplifyConfig: mockAmplifyConfig,
			tokenProvider: mockTokenProvider,
			credentialsProvider: mockCredentialAndIdentityProvider,
			operation: mockOperation,
		});

		expect(mockOperation).toHaveBeenCalledWith(mockContextSpec);
	});

	it('should destroy the context after the operation', async () => {
		const mockOperation = jest.fn();
		await runWithAmplifyServerContext({
			amplifyConfig: mockAmplifyConfig,
			tokenProvider: mockTokenProvider,
			credentialsProvider: mockCredentialAndIdentityProvider,
			operation: mockOperation,
		});

		expect(mockDestroyAmplifyServerContext).toHaveBeenCalledWith(
			mockContextSpec
		);
	});
});
