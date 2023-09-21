// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getCrypto } from '@aws-amplify/core/internals/utils';
/*
 * Cryptographically secure pseudorandom number generator
 * As Math.random() is cryptographically not safe to use
 */
export default function cryptoSecureRandomInt() {
	const crypto = getCrypto();

	// Use getRandomValues method (Browser)
	const randomResult = crypto.getRandomValues(new Uint32Array(1))[0];
	return randomResult;
}
