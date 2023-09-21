// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { encode } from 'base-64';
import { base64Encoder } from '../../../src/utils/convert/base64/base64Encoder.native';
import { bytesToString } from '../../../src/utils/convert/base64/util';

// mock base-64
jest.mock('base-64');
jest.mock('../../../src/utils/convert/base64/util');

const mockEncode = encode as jest.Mock;
const mockBytesToString = bytesToString as jest.Mock;

describe('base64Encoder (native)', () => {
	beforeEach(() => {
		mockEncode.mockReset();
		mockBytesToString.mockReset();
	});

	it('has a convert method', () => {
		expect(base64Encoder.convert).toBeDefined();
	});

	it('invokes bytesToString if input is Uint8Array', () => {
		const mockBytes = new Uint8Array([1, 2, 3]);
		base64Encoder.convert(mockBytes);
		expect(mockBytesToString).toHaveBeenCalledWith(mockBytes);
	});

	it('invokes the encode function from base-64', () => {
		base64Encoder.convert('test');
		expect(mockEncode).toHaveBeenCalledWith('test');
	});

	it('makes the result url safe if urlSafe is true', () => {
		const mockResult = 'test+test/test';
		mockEncode.mockReturnValue(mockResult);
		expect(base64Encoder.convert('test', { urlSafe: true })).toBe(
			'test-test_test'
		);
	});
});
