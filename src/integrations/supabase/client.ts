import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL_RAW = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_ANON_KEY_RAW = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY;

const SUPABASE_URL = String(SUPABASE_URL_RAW || '').trim();
const SUPABASE_ANON_KEY = String(SUPABASE_ANON_KEY_RAW || '').trim();

const isLikelySupabaseUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
};

const isSupabaseConfigured = (): boolean =>
  Boolean(
    SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes('your-project') &&
      !SUPABASE_ANON_KEY.includes('your-') &&
      isLikelySupabaseUrl(SUPABASE_URL)
  );

export const clearSupabaseAuthStorage = () => {
  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (
        key.startsWith('sb-') ||
        key.startsWith('supabase.auth.') ||
        key.includes('-auth-token')
      ) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // ignore storage failures
  }
};

const createMockChain = () => ({
  select: () => createMockChain(),
  eq: () => createMockChain(),
  order: () => createMockChain(),
  limit: () => createMockChain(),
  single: () => createMockChain(),
  maybeSingle: () => Promise.resolve({ data: null, error: null }),
  insert: () => createMockChain(),
  update: () => createMockChain(),
  upsert: () => createMockChain(),
  delete: () => createMockChain(),
  then: (onFulfilled: any) => Promise.resolve({ data: null, error: null }).then(onFulfilled),
  catch: (onRejected: any) => Promise.resolve({ data: null, error: null }).catch(onRejected),
});

let supabase: any = null;

if (isSupabaseConfigured()) {
  supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} else {
  console.warn('Supabase not configured or invalid URL. Using mock client.');
  supabase = {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () => Promise.reject(new Error('Not configured')),
      signUp: () => Promise.reject(new Error('Not configured')),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => createMockChain(),
  };
}

export { supabase };
