// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { base64Decoder } from '../../../src/utils/convert/base64/base64Decoder';
import { getAtoB } from '../../../src/utils/getGlobal';

jest.mock('../../../src/utils/getGlobal');

const mockGetAtoB = getAtoB as jest.Mock;

describe('base64Decoder (non-native)', () => {
	const mockAtob = jest.fn();

	beforeEach(() => {
		mockGetAtoB.mockReset();
		mockAtob.mockReset();
		mockGetAtoB.mockReturnValue(mockAtob);
	});

	it('has a convert method', () => {
		expect(base64Decoder.convert).toBeDefined();
	});

	it('invokes the getAtoB function to get atob from globals', () => {
		base64Decoder.convert('test');
		expect(mockGetAtoB).toHaveBeenCalled();
		expect(mockAtob).toHaveBeenCalledWith('test');
	});
});
