
import { z } from 'zod';
import { manualConnectSchema } from './schema';

export const api = {
  // We might not strictly need backend routes if using Firebase Client SDK,
  // but defining a clear contract is good practice.
  // We'll keep this minimal as most logic will be client-side Firebase calls.
};

// Required helper for frontend
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
