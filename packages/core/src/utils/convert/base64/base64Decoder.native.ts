// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { decode } from 'base-64';
import { Base64Decoder } from '../types';

export const base64Decoder: Base64Decoder = {
	convert(input) {
		return decode(input);
	},
};
