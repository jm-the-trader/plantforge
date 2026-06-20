// Shared defaults for user preferences. The values themselves are read/written
// through the `db` facade (db.getSettings / db.updateSettings) so they sync in
// cloud mode and fall back to localStorage in local mode.

export const DEFAULT_COLLECTION_NAME = 'My Plants'
