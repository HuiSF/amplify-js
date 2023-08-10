// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
	DefaultTokenStore,
	TokenOrchestrator,
	CognitoUserPoolTokenRefresher,
} from '@aws-amplify/auth/cognito';

import { KeyValueStorageInterface, TokenProvider } from '@aws-amplify/core';
import { createUserPoolsTokenProvider } from '../../../src';

jest.mock('@aws-amplify/auth/cognito');

const mockKeyValueStorage: KeyValueStorageInterface = {
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
const MockDefaultTokenStore = DefaultTokenStore as jest.Mock;
const MockTokenOrchestrator = TokenOrchestrator as jest.Mock;
const MockCognitoUserPoolTokenRefresher =
	CognitoUserPoolTokenRefresher as jest.Mock;

describe('createUserPoolsTokenProvider', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should create a token provider with underlying dependencies', () => {
		const tokenProvider = createUserPoolsTokenProvider(mockKeyValueStorage);

		expect(MockDefaultTokenStore).toHaveBeenCalledTimes(1);
		const mockTokenStoreInstance = MockDefaultTokenStore.mock.instances[0];
		expect(mockTokenStoreInstance.setKeyValueStorage).toHaveBeenCalledWith(
			mockKeyValueStorage
		);

		expect(MockTokenOrchestrator).toHaveBeenCalledTimes(1);
		const mockTokenOrchestratorInstance =
			MockTokenOrchestrator.mock.instances[0];
		expect(
			mockTokenOrchestratorInstance.setAuthTokenStore
		).toHaveBeenCalledWith(mockTokenStoreInstance);
		expect(
			mockTokenOrchestratorInstance.setTokenRefresher
		).toHaveBeenCalledWith(MockCognitoUserPoolTokenRefresher);

		expect(tokenProvider).toBeDefined();
	});

	it('should call TokenOrchestrator.getTokens method with the default forceRefresh value', async () => {
		const tokenProvider = createUserPoolsTokenProvider(mockKeyValueStorage);
		const mockTokenOrchestratorInstance =
			MockTokenOrchestrator.mock.instances[0];

		await tokenProvider.getTokens();
		expect(mockTokenOrchestratorInstance.getTokens).toHaveBeenCalledTimes(1);
		expect(mockTokenOrchestratorInstance.getTokens).toHaveBeenLastCalledWith({
			forceRefresh: false,
		});
	});

	it('should call TokenOrchestrator.getTokens method with the specified forceRefresh value', async () => {
		const tokenProvider = createUserPoolsTokenProvider(mockKeyValueStorage);
		const mockTokenOrchestratorInstance =
			MockTokenOrchestrator.mock.instances[0];

		await tokenProvider.getTokens({ forceRefresh: true });
		expect(mockTokenOrchestratorInstance.getTokens).toHaveBeenCalledTimes(1);
		expect(mockTokenOrchestratorInstance.getTokens).toHaveBeenLastCalledWith({
			forceRefresh: true,
		});
	});
});
