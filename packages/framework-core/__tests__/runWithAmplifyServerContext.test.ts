import { runWithAmplifyServerContext } from '../src/runWithAmplifyServerContext';
import {
	createAmplifyServerContext,
	destroyAmplifyServerContext,
} from '../src/serverContext';

// mock serverContext
jest.mock('../src/serverContext');
const mockCreateAmplifyServerContext = createAmplifyServerContext as jest.Mock;
const mockDestroyAmplifyServerContext =
	destroyAmplifyServerContext as jest.Mock;

describe('runWithAmplifyServerContext', () => {
	const mockAmplifyConfig = {};
	const mockContextSpec = {
		token: { value: Symbol('AmplifyServerContextToken') },
	};

	beforeEach(() => {
		mockCreateAmplifyServerContext.mockReturnValueOnce(mockContextSpec);
	});

	it('should run the operation with the context', () => {
		const mockOperation = jest.fn();
		runWithAmplifyServerContext({
			amplifyConfig: mockAmplifyConfig,
			operation: mockOperation,
		});

		expect(mockOperation).toHaveBeenCalledWith(mockContextSpec);
	});

	it('should destroy the context after the operation', async () => {
		const mockOperation = jest.fn();
		await runWithAmplifyServerContext({
			amplifyConfig: mockAmplifyConfig,
			operation: mockOperation,
		});

		expect(mockDestroyAmplifyServerContext).toHaveBeenCalledWith(
			mockContextSpec
		);
	});
});
