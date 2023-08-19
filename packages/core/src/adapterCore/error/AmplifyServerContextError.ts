// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export class AmplifyServerContextError extends Error {
	constructor({
		message,
		recoverySuggestion,
		underlyingException,
	}: {
		message: string;
		recoverySuggestion?: string;
		underlyingException?: Error;
	}) {
		super(message);
		this.name = 'AmplifyServerContextError';
		this.recoverySuggestion = recoverySuggestion;
		this.underlyingException = underlyingException;
	}

	recoverySuggestion?: string;
	underlyingException?: Error;
}

const error = new AmplifyServerContextError({
	message: 'test',
});
