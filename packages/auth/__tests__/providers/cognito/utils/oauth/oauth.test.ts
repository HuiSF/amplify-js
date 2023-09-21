// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
	generateRandomString,
	getCrypto,
} from '@aws-amplify/core/internals/utils';
import {
	generateCodeVerifier,
	generateState,
} from '../../../../../src/providers/cognito/utils/oauth/index';

jest.mock('@aws-amplify/core/internals/utils');
// mock Uint8Array
global.Uint8Array = jest.fn();

const mockGenerateRandomString = generateRandomString as jest.Mock;
const mockGetCrypto = getCrypto as jest.Mock;

describe('generateState', () => {
	it('invokes generateRandomString with length parameter value 32', () => {
		generateState();
		expect(mockGenerateRandomString).toHaveBeenCalledWith(32);
	});
});

describe('generateCodeVerifier', () => {
	const OriginalUint8Array = global.Uint8Array;
	const mockUint8Array = jest.fn();
	const mockCrypto = {
		getRandomValues: jest.fn(),
	};

	beforeAll(() => {
		global.Uint8Array = mockUint8Array as any;
	});

	afterAll(() => {
		global.Uint8Array = OriginalUint8Array;
	});

	beforeEach(() => {
		mockCrypto.getRandomValues.mockReset();
		mockUint8Array.mockReset();
		mockGetCrypto.mockReturnValue(mockCrypto);
	});

	it('invokes getCrypto() to get crypto from the globals', () => {
		generateCodeVerifier(32);
		expect(mockGetCrypto).toHaveBeenCalled();
	});

	it('invokes getRandomValues with the correct parameter', () => {
		const expectedUint8Array = new OriginalUint8Array(128);
		mockUint8Array.mockImplementationOnce(() => expectedUint8Array);

		generateCodeVerifier(128);

		expect(mockUint8Array).toHaveBeenCalledWith(128);
		expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(expectedUint8Array);
	});

	it('returns the correct codeVerifier', () => {});
});
