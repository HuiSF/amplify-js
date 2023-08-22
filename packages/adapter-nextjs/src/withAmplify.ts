import { ResourcesConfig } from '@aws-amplify/core';
import { NextConfig } from 'next';

// NOTE: this function is exported from the subpath `/with-amplify`.
// The reason is the this function is called in the `next.config.js` which
// is not being transpied by Next.js.

/**
 * Merges the `amplifyConfig` into the `nextConfig.env`.
 * @param nextConfig The next config for a Next.js app.
 * @param amplifyConfig
 * @returns The updated the `nextConfig`.
 */
export const withAmplify = (
	nextConfig: NextConfig,
	amplifyConfig: ResourcesConfig
) => {
	const env = nextConfig.env;

	if (env) {
		env.amplifyConfig = JSON.stringify(amplifyConfig);
	} else {
		nextConfig.env = {
			amplifyConfig: JSON.stringify(amplifyConfig),
		};
	}

	return nextConfig;
};
