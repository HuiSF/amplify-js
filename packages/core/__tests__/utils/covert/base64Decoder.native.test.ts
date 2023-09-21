// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { decode } from 'base-64';
import { base64Decoder } from '../../../src/utils/convert/base64/base64Decoder.native';

jest.mock('base-64');

const mockDecode = decode as jest.Mock;

describe('base64Decoder (native)', () => {
	beforeEach(() => {
		mockDecode.mockReset();
	});

	it('has a convert method', () => {
		expect(base64Decoder.convert).toBeDefined();
	});

	it('invokes the decode function from base-64', () => {
		base64Decoder.convert('test');
		expect(mockDecode).toHaveBeenCalledWith('test');
	});
});
