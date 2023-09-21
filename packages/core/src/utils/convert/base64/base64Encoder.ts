// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getBtoA } from '../../getGlobal';
import { Base64Encoder } from '../types';
import { bytesToString } from './util';

export const base64Encoder: Base64Encoder = {
	convert(input, { urlSafe } = { urlSafe: false }) {
		const inputStr = typeof input === 'string' ? input : bytesToString(input);
		const encodedStr = getBtoA()(inputStr);

		// see details about the char replacing at https://datatracker.ietf.org/doc/html/rfc4648#section-5
		return urlSafe
			? encodedStr.replace(/\+/g, '-').replace(/\//g, '_')
			: encodedStr;
	},
};
