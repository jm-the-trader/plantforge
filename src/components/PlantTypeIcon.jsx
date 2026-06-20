// Distinct line-style plant icons used as the no-photo fallback. A plant's
// `type` is matched (by keyword, so free text works too) to a visual category;
// anything unrecognized falls back to a generic leafy plant.

const CATEGORY_RULES = [
  [/snake|sansevieria|\bzz\b|zamioculcas/, 'snake'],
  [/monstera|swiss cheese/, 'monstera'],
  [/cact|saguaro/, 'cactus'],
  [/succulent|jade|aloe|echeveria|haworthia|sedum|crassula/, 'succulent'],
  [/string of|pearls|pothos|philodendron|\bivy\b|hoya|heartleaf|trailing/, 'trailing'],
  [/palm|areca|majesty|bird of paradise|strelitzia/, 'palm'],
  [/fern/, 'fern'],
  [/orchid|lily|anthurium|begonia|bloom|flower/, 'flower'],
]

export function plantCategory(type) {
  const t = (type || '').toLowerCase()
  for (const [re, cat] of CATEGORY_RULES) if (re.test(t)) return cat
  return 'leafy'
}

// Shared terracotta-ish pot for grounded plants.
const POT = (
  <>
    <path d="M8 15h8l-1 5.5H9z" />
    <path d="M7.3 15h9.4" />
  </>
)

const FOLIAGE = {
  // Tall upright blades (Snake Plant, ZZ).
  snake: (
    <>
      <path d="M12 14.5C12 10 12 7 12 4.5" />
      <path d="M12 14.5C10.5 10.5 9.6 8 9.3 5.6" />
      <path d="M12 14.5C13.5 10.5 14.4 8 14.7 5.6" />
      {POT}
    </>
  ),
  // One big split leaf (Monstera).
  monstera: (
    <>
      <path d="M12 14.5c-5-1.5-6.5-7-3-10 2-1.7 4-1.7 6 0 3.5 3 2 8.5-3 10z" />
      <path d="M12 14V5" />
      <path d="M12 8.4 9.2 8M12 11 9.5 10.7" />
      <path d="M12 8.4 14.8 8M12 11 14.5 10.7" />
      {POT}
    </>
  ),
  // Saguaro cactus.
  cactus: (
    <>
      <path d="M10.4 15V9.4a1.6 1.6 0 0 1 3.2 0V15" />
      <path d="M10.4 12.2H8.6V9.9" />
      <path d="M13.6 11h1.8V8.7" />
      {POT}
    </>
  ),
  // Rosette of pointed leaves (succulents, aloe, jade).
  succulent: (
    <>
      <path d="M12 13.8V7.2" />
      <path d="M12 13.8 9 8.4M12 13.8 15 8.4" />
      <path d="M12 13.8 7.7 10.6M12 13.8 16.3 10.6" />
      <path d="M12 13.8 10.4 7.6M12 13.8 13.6 7.6" />
      {POT}
    </>
  ),
  // Crown of fronds (palm, bird of paradise).
  palm: (
    <>
      <path d="M12 15c0-3 0-4.8 0-6.5" />
      <path d="M12 8.5C9 7 7 5.6 5.6 5.1" />
      <path d="M12 8.5C10.6 5.6 9.7 4.2 9.2 3.2" />
      <path d="M12 8.5C12 5.6 12 4.2 12 2.9" />
      <path d="M12 8.5C13.4 5.6 14.3 4.2 14.8 3.2" />
      <path d="M12 8.5C15 7 17 5.6 18.4 5.1" />
      {POT}
    </>
  ),
  // Feathery frond with leaflets (ferns).
  fern: (
    <>
      <path d="M12 15V4" />
      <path d="M12 5.6 10 5.1M12 5.6 14 5.1" />
      <path d="M12 7.7 9.4 7.1M12 7.7 14.6 7.1" />
      <path d="M12 9.8 9 9.1M12 9.8 15 9.1" />
      <path d="M12 11.9 9.3 11.4M12 11.9 14.7 11.4" />
      {POT}
    </>
  ),
  // Hanging pot with draping vines (pothos, ivy, string of pearls).
  trailing: (
    <>
      <path d="M9 5h6l-.8 3.2H9.8z" />
      <path d="M8.2 5h7.6" />
      <path d="M9.6 5 12 2.8 14.4 5" />
      <path d="M10.6 8.2C9.6 12 9.1 15.6 9 19" />
      <path d="M13.4 8.2C14.4 12 14.9 15.6 15 19" />
      <path d="M9.1 11.4 7.5 11M9 14.4 7.4 14.2M14.9 11.4 16.5 11M15 14.4 16.6 14.2" />
    </>
  ),
  // Stem with a bloom (orchid, peace lily, anthurium, begonia).
  flower: (
    <>
      <path d="M12 15V9" />
      <path d="M12 12C10.5 11 9.3 11.4 9.1 12.8M12 13.2C13.5 12.2 14.7 12.6 14.9 14" />
      <circle cx="12" cy="6.2" r="1.1" />
      <path d="M12 5.1C11 3.9 9.5 4.1 9.3 5.6M12 5.1C13 3.9 14.5 4.1 14.7 5.6" />
      <path d="M11 6.7C9.5 7.1 9 8.4 9.9 9.4M13 6.7C14.5 7.1 15 8.4 14.1 9.4" />
      {POT}
    </>
  ),
  // Generic bushy potted plant (default — broad curved leaves).
  leafy: (
    <>
      <path d="M12 15C7.6 13.5 6.2 8.6 8.6 4.9" />
      <path d="M12 15C16.4 13.5 17.8 8.6 15.4 4.9" />
      <path d="M12 15C12 10 12 7 12 4.3" />
      {POT}
    </>
  ),
}

export default function PlantTypeIcon({ type, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {FOLIAGE[plantCategory(type)]}
    </svg>
  )
}
