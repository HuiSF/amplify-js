// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AmplifyError, getCrypto } from '../../src/libraryUtils';
import { getAtoB, getBtoA } from '../../src/utils/getGlobal';

describe('getGlobal', () => {
	let mockWindow: jest.SpyInstance;

	beforeAll(() => {
		mockWindow = jest.spyOn(window, 'window', 'get');
	});

	describe('getCrypto()', () => {
		afterEach(() => {
			mockWindow.mockReset();
			Object.defineProperty(global, 'crypto', {
				value: undefined,
				writable: true,
			});
		});

		it('returns window.crypto when it is available', () => {
			const mockCrypto = {
				getRandomValues: jest.fn(),
			};
			mockWindow.mockImplementation(() => ({
				crypto: mockCrypto,
			}));

			expect(getCrypto()).toEqual(mockCrypto);
		});

		it('returns the global crypto when it is available', () => {
			const mockCrypto = {
				getRandomValues: jest.fn(),
			};

			mockWindow.mockImplementation(() => undefined);
			Object.defineProperty(global, 'crypto', {
				value: mockCrypto,
				writable: true,
			});

			expect(getCrypto()).toEqual(mockCrypto);
		});

		it('should throw error if crypto is unavailable globally', () => {
			mockWindow.mockImplementation(() => undefined);

			expect(() => getCrypto()).toThrow(AmplifyError);
		});
	});

	describe('getBtoA()', () => {
		afterEach(() => {
			mockWindow.mockReset();
			Object.defineProperty(global, 'btoa', {
				value: undefined,
				writable: true,
			});
		});

		it('returns window.btoa when it is available', () => {
			const mockBtoA = jest.fn();
			mockWindow.mockImplementation(() => ({
				btoa: mockBtoA,
			}));

			expect(getBtoA()).toEqual(mockBtoA);
		});

		it('returns the global btoa when it is available', () => {
			const mockBtoA = jest.fn();
			mockWindow.mockImplementation(() => undefined);
			Object.defineProperty(global, 'btoa', {
				value: mockBtoA,
				writable: true,
			});

			expect(getBtoA()).toEqual(mockBtoA);
		});

		it('throws error if crypto is unavailable globally', () => {
			mockWindow.mockImplementation(() => undefined);

			expect(() => getBtoA()).toThrow(AmplifyError);
		});
	});

	describe('getAtoB()', () => {
		afterEach(() => {
			mockWindow.mockReset();
			Object.defineProperty(global, 'atob', {
				value: undefined,
				writable: true,
			});
		});

		it('returns window.atob when it is available', () => {
			const mockAtoB = jest.fn();
			mockWindow.mockImplementation(() => ({
				atob: mockAtoB,
			}));

			expect(getAtoB()).toEqual(mockAtoB);
		});

		it('returns the global atob when it is available', () => {
			const mockAtoB = jest.fn();
			mockWindow.mockImplementation(() => undefined);
			Object.defineProperty(global, 'atob', {
				value: mockAtoB,
				writable: true,
			});

			expect(getAtoB()).toEqual(mockAtoB);
		});

		it('throws error if atob is unavailable globally', () => {
			mockWindow.mockImplementation(() => undefined);

			expect(() => getAtoB()).toThrow(AmplifyError);
		});
	});
});
