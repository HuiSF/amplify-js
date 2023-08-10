import { KeyValueStorageInterface } from '@aws-amplify/core';
import { CookiesStorageAdapter } from './types';

export function createKeyValueStorageFromCookiesStorageAdapter(
	cookiesStorageAdapter: CookiesStorageAdapter
): KeyValueStorageInterface {
	const _cookiesStorageAdapter = cookiesStorageAdapter;
	return {
		setItem(key, value) {
			// TODO(HuiSF): follow up the default CookieSerializeOptions values
			const originalCookie = cookiesStorageAdapter.get(key) ?? {};
			_cookiesStorageAdapter.set(key, value, {
				domain: originalCookie.domain,
				expires: originalCookie.expires,
				httpOnly: originalCookie.httpOnly,
				maxAge: originalCookie.maxAge,
				sameSite: originalCookie.sameSite,
			});
			return Promise.resolve();
		},
		getItem(key) {
			const cookie = _cookiesStorageAdapter.get(key);
			return Promise.resolve(cookie?.value ?? null);
		},
		removeItem(key) {
			_cookiesStorageAdapter.delete(key);
			return Promise.resolve();
		},
		clear() {
			// TODO(HuiSF): follow up the implementation.
			throw new Error('This method has not implemented.');
		},
	};
}
