import { KeyValueStorageInterface } from '@aws-amplify/core';
import { Cookie, CookiesStorageAdapter } from './types';

export function createKeyValueStorageFromCookiesStorageAdapter(
	cookiesStorageAdapter: CookiesStorageAdapter
): KeyValueStorageInterface {
	const _cookiesStorageAdapter = cookiesStorageAdapter;
	return {
		setItem(key, value) {
			// TODO(HuiSF): follow up the default CookieSerializeOptions values
			const originalCookie = cookiesStorageAdapter.get(key) ?? {};
			_cookiesStorageAdapter.set(key, value, {
				...extractSerializeOptions(originalCookie),
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

function extractSerializeOptions(cookie: Cookie) {
	return {
		domain: cookie.domain,
		expires: cookie.expires,
		httpOnly: cookie.httpOnly,
		maxAge: cookie.maxAge,
		sameSite: cookie.sameSite,
	};
}
