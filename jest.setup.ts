/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetch, { Request, Response, Headers } from 'node-fetch';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Polyfill fetch, Request, Response, Headers for Node.js
if (typeof global.fetch === 'undefined') {
  // @ts-ignore
  global.fetch = fetch;
}
if (typeof global.Request === 'undefined') {
  // @ts-ignore
  global.Request = Request;
}
if (typeof global.Response === 'undefined') {
  // @ts-ignore
  global.Response = Response;
}
if (typeof global.Headers === 'undefined') {
  // @ts-ignore
  global.Headers = Headers;
}
