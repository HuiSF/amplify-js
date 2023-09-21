// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { base64Encoder } from '../../../src/utils/convert/base64/base64Encoder';
import { getBtoA } from '../../../src/utils/getGlobal';
import { bytesToString } from '../../../src/utils/convert/base64/util';

jest.mock('../../../src/utils/getGlobal');
jest.mock('../../../src/utils/convert/base64/util');

const mockGetBtoA = getBtoA as jest.Mock;
const mockBytesToString = bytesToString as jest.Mock;

describe('base64Encoder (non-native)', () => {
	const mockBtoa = jest.fn();

	beforeEach(() => {
		mockBtoa.mockReset();
		mockBytesToString.mockReset();
		mockGetBtoA.mockReturnValue(mockBtoa);
	});

	it('has a convert method', () => {
		expect(base64Encoder.convert).toBeDefined();
	});

	it('invokes bytesToString if input is Uint8Array', () => {
		const mockBytes = new Uint8Array([1, 2, 3]);
		base64Encoder.convert(mockBytes);
		expect(mockBytesToString).toHaveBeenCalledWith(mockBytes);
	});

	it('invokes the getBtoA function to get btoa from globals', () => {
		base64Encoder.convert('test');
		expect(mockGetBtoA).toHaveBeenCalled();
		expect(mockBtoa).toHaveBeenCalledWith('test');
	});

	it('makes the result url safe if urlSafe is true', () => {
		const mockResult = 'test+test/test';
		mockBtoa.mockReturnValue(mockResult);
		expect(base64Encoder.convert('test', { urlSafe: true })).toBe(
			'test-test_test'
		);
	});
});
