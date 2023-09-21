// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AmplifyError } from '../libraryUtils';

export const getCrypto = () => {
	if (typeof window === 'object' && typeof window.crypto === 'object') {
		return window.crypto;
	}

	if (typeof crypto === 'object') {
		return crypto;
	}

	throw new AmplifyError({
		name: 'MissingPolyfill',
		message: 'Cannot find `crypto` in the global.',
	});
};

export const getBtoA = () => {
	// browser
	if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
		return window.btoa;
	}

	// Next.js global polyfill
	if (typeof btoa === 'function') {
		return btoa;
	}

	throw new AmplifyError({
		name: 'Base64EncoderError',
		message: 'Cannot resolve the `btoa` function from the environment.',
	});
};

export const getAtoB = () => {
	// browser
	if (typeof window !== 'undefined' && typeof window.atob === 'function') {
		return window.atob;
	}

	// Next.js global polyfill
	if (typeof atob === 'function') {
		return atob;
	}

	throw new AmplifyError({
		name: 'Base64EncoderError',
		message: 'Cannot resolve the `btoa` function from the environment.',
	});
};
