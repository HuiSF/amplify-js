import 'server-only';

import { NextServer } from './types';
import { getAmplifyConfig } from './utils';

export const runWithAmplifyServerContext: NextServer.RunWithContext = async ({
	nextServerContext,
	operation,
}) => {
	// 1. get amplify config from env vars
	// 2. create key-value storage from nextServerContext
	// 3. create credentials provider
	// 4. create token provider
	// 5. call low level runWithAmplifyServerContext
	const amplifyConfig = getAmplifyConfig();
};
