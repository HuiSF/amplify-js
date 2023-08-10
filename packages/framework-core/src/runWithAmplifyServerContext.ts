import {
	createAmplifyServerContext,
	destroyAmplifyServerContext,
} from './serverContext';
import { RunWithAmplifyServerContext } from './types';

export const runWithAmplifyServerContext: RunWithAmplifyServerContext =
	async function runWithAmplifyServerContext({
		amplifyConfig,
		cookiesStorageAdapter,
		operation,
	}) {
		const contextSpec = createAmplifyServerContext({
			amplifyConfig,
			cookiesStorageAdapter,
		});

		// run the operation with injecting the context
		const result = await operation(contextSpec);

		destroyAmplifyServerContext(contextSpec);

		return result;
	};
