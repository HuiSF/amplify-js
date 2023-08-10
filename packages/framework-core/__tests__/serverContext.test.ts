import {
	createAmplifyServerContext,
	getAmplifyServerContext,
	destroyAmplifyServerContext,
} from '../src';
import {
	AmplifyServerContext,
	AmplifyServerContextSpec,
	CookiesStorageAdapter,
} from '../src/types';

const mockConfigure = jest.fn();
jest.mock('@aws-amplify/core', () => ({
	AmplifyClassV6: jest.fn().mockImplementation(() => ({
		configure: mockConfigure,
	})),
}));

const mockAmplifyConfig = {};
const mockCookiesStorageAdapter: CookiesStorageAdapter = {
	getAll: jest.fn(),
	get: jest.fn(),
	set: jest.fn(),
	delete: jest.fn(),
};

describe('serverContext', () => {
	describe('createAmplifyServerContext', () => {
		it('should invoke AmplifyClassV6.configure', () => {
			createAmplifyServerContext({
				amplifyConfig: mockAmplifyConfig,
				cookiesStorageAdapter: mockCookiesStorageAdapter,
			});

			expect(mockConfigure).toBeCalledWith(mockAmplifyConfig, {
				Auth: {
					keyValueStorage: expect.any(Object),
				},
			});
		});

		it('should return a context spec', () => {
			const contextSpec = createAmplifyServerContext({
				amplifyConfig: mockAmplifyConfig,
				cookiesStorageAdapter: mockCookiesStorageAdapter,
			});

			expect(typeof contextSpec.token.value).toBe('symbol');
		});
	});

	describe('getAmplifyServerContext', () => {
		it('should return the context', () => {
			const contextSpect = createAmplifyServerContext({
				amplifyConfig: mockAmplifyConfig,
				cookiesStorageAdapter: mockCookiesStorageAdapter,
			});
			const context = getAmplifyServerContext(contextSpect);

			expect(context).toBeDefined();
		});

		it('should throw an error if the context is not found', () => {
			expect(() =>
				getAmplifyServerContext({ token: { value: Symbol('test') } })
			).toThrowError(
				'Attempted to get the Amplify Server Context that may have been destroyed.'
			);
		});
	});

	describe('destroyAmplifyServerContext', () => {
		it('should destroy the context', () => {
			const contextSpect = createAmplifyServerContext({
				amplifyConfig: mockAmplifyConfig,
				cookiesStorageAdapter: mockCookiesStorageAdapter,
			});

			destroyAmplifyServerContext(contextSpect);

			expect(() => getAmplifyServerContext(contextSpect)).toThrowError(
				'Attempted to get the Amplify Server Context that may have been destroyed.'
			);
		});
	});
});
