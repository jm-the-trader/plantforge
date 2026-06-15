import { createClient } from '@supabase/supabase-js'

// Public Supabase config (safe to ship in the client). When BOTH are present we
// run in cloud mode; otherwise the app falls back to local-only mode (data in
// the browser, no login) so it works before any Supabase setup.
const URL = import.meta.env.VITE_SUPABASE_URL?.trim()
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const IS_SUPABASE = Boolean(URL && ANON)

export const supabase = IS_SUPABASE
  ? createClient(URL, ANON, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null

export const PHOTO_BUCKET = 'plant-photos'

// Supabase Auth is email-based, but we let users sign in with a short username
// for convenience. A username (anything without an "@") is mapped to a synthetic
// email "<username>@<USERNAME_DOMAIN>" behind the scenes.
//
// The domain MUST match the email used when the Supabase user was created.
// It's configurable via VITE_USERNAME_DOMAIN so it can match an existing account
// — e.g. set VITE_USERNAME_DOMAIN=local.me if your user is "xk@local.me", and
// then signing in as "xk" works. Default below.
export const USERNAME_DOMAIN = (import.meta.env.VITE_USERNAME_DOMAIN || 'plantforge.local').trim()

// Turn whatever the user typed into the email Supabase expects.
export function toLoginEmail(identifier) {
  const id = (identifier || '').trim()
  if (!id) return ''
  return id.includes('@') ? id.toLowerCase() : `${id.toLowerCase()}@${USERNAME_DOMAIN}`
}
