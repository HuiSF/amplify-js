// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// import the polyfill for `crypto.getRandomValues` for react-native
// so the subsequent call to `generateCodeVerifier` can use it
import 'react-native-get-random-values';

export { generateCodeVerifier } from './generateCodeVerifier';
export { generateState } from './generateState';
