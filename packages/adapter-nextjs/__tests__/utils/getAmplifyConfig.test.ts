import { getAmplifyConfig } from '../../src/utils/getAmplifyConfig';

describe('getAmplifyConfig', () => {
	it('should return amplifyConfig from env vars', () => {
		const mockAmplifyConfig = {
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
		process.env.amplifyConfig = JSON.stringify(mockAmplifyConfig);

		const result = getAmplifyConfig();
		expect(result).toEqual(mockAmplifyConfig);
	});

	it('should throw error when amplifyConfig is found from env vars', () => {
		delete process.env.amplifyConfig;

		expect(() => getAmplifyConfig()).toThrowError();
	});
});
