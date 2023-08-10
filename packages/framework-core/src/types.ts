import { AmplifyClassV6, ResourcesConfig } from '@aws-amplify/core';
import { CookieSerializeOptions } from 'cookie';

/**
 * @internal
 */
export type AmplifyServerContextToken = {
	readonly value: Symbol;
};

export type AmplifyServerContextSpec = {
	readonly token: AmplifyServerContextToken;
};

export type AmplifyServerContext = {
	client: AmplifyClassV6;
};

export type SetCookieOptions = Pick<
	CookieSerializeOptions,
	'expires' | 'maxAge' | 'httpOnly' | 'domain' | 'sameSite'
>;
export type Cookie = {
	name?: string;
	value?: string;
} & SetCookieOptions;

export interface CookiesStorageAdapter {
	/**
	 * Get all cookies form the storage.
	 */
	getAll(): Cookie[];
	/**
	 * Get a cookie from the storage.
	 * @param name The name of the cookie.
	 */
	get(name: string): Cookie | undefined;
	/**
	 * Set a cookie in the storage.
	 * @param name The name of the cookie.
	 * @param value The value of the cookie.
	 * @param [options] The cookie's options.
	 */
	set(name: string, value: string, options?: SetCookieOptions): void;
	/**
	 * Delete a cookie from the storage.
	 * @param name The name of the cookie.
	 */
	delete(name: string): void;
}

export interface CreateAmplifyServerContextInput {
	/**
	 * The Amplify configuration object, typically imported from the aws-exports.js.
	 */
	amplifyConfig: ResourcesConfig;
	/**
	 * The {@link CookiesStorageAdapter} created to allow Amplify to perform cookie operations.
	 */
	cookiesStorageAdapter?: CookiesStorageAdapter;
}
