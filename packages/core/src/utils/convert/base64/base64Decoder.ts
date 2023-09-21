// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getAtoB } from '../../getGlobal';
import { Base64Decoder } from '../types';

export const base64Decoder: Base64Decoder = {
	convert(input) {
		return getAtoB()(input);
	},
};
