import { ResourcesConfig } from '@aws-amplify/core';
import { withAmplify } from '../src/withAmplify';

describe('withAmplify', () => {
	it('should add amplifyConfig to nextConfig.env', () => {
		const nextConfig = {};
		const mockAmplifyConfig: ResourcesConfig = {
			Auth: {
				identityPoolId: '123',
				userPoolId: 'abc',
				userPoolWebClientId: 'def',
			},
			Storage: {
				bucket: 'bucket',
				region: 'us-east-1',
			},
		};

		const result = withAmplify(nextConfig, mockAmplifyConfig);

		expect(result).toEqual({
			env: {
				amplifyConfig: JSON.stringify(mockAmplifyConfig),
			},
		});
	});

	it('should merge amplifyConfig to nextConfig.env (if this key has already defined)', () => {
		const nextConfig = {
			env: {
				existingKey: '123',
			},
		};
		const mockAmplifyConfig: ResourcesConfig = {
			Auth: {
				identityPoolId: '123',
				userPoolId: 'abc',
				userPoolWebClientId: 'def',
			},
			Storage: {
				bucket: 'bucket',
				region: 'us-east-1',
			},
		};

		const result = withAmplify(nextConfig, mockAmplifyConfig);

		expect(result).toEqual({
			env: {
				existingKey: '123',
				amplifyConfig: JSON.stringify(mockAmplifyConfig),
			},
		});
	});
});
