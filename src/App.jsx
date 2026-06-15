import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom'
import { useAuth } from './auth/AuthProvider.jsx'
import LoginPage from './auth/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PlantList from './pages/PlantList.jsx'
import PlantDetail from './pages/PlantDetail.jsx'
import PlantForm from './pages/PlantForm.jsx'
import Settings from './pages/Settings.jsx'

const TABS = [
  { to: '/', icon: '🏠', label: 'Home', end: true },
  { to: '/plants', icon: '🌿', label: 'Plants' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

function BottomNav() {
  const tab = ({ isActive }) =>
    `flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium tracking-tight transition-colors ${
      isActive ? 'text-canopy-400' : 'text-soil-50/50'
    }`
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-soil-900/85 backdrop-blur-xl pb-safe">
      <div className="mx-auto flex max-w-xl items-stretch">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={tab}>
            {({ isActive }) => (
              <>
                <span className={`text-[22px] leading-none transition-transform ${isActive ? 'scale-110' : ''}`}>
                  {t.icon}
                </span>
                {t.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

// Floating "add" button — thumb-reachable, sits just above the tab bar.
function AddFab() {
  return (
    <Link
      to="/plants/new"
      aria-label="Add plant"
      className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-canopy-600 text-3xl font-light text-white shadow-xl shadow-canopy-700/40 transition active:scale-95"
      style={{ bottom: 'calc(72px + var(--sab))' }}
    >
      +
    </Link>
  )
}

function Shell({ children, showFab }) {
  return (
    <div className="mx-auto min-h-[100dvh] max-w-xl pb-28 pt-safe">
      <div className="px-4">{children}</div>
      {showFab && <AddFab />}
      <BottomNav />
    </div>
  )
}

export default function App() {
  const { ready, needsAuth, isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  if (!ready) {
    return <div className="grid min-h-[100dvh] place-items-center text-soil-50/50">Loading…</div>
  }

  if (needsAuth && !isAuthenticated) {
    return <LoginPage />
  }

  // Hide the add button on the form pages (it'd be redundant there).
  const showFab = !pathname.includes('/plants/new') && !pathname.endsWith('/edit')

  return (
    <Shell key={pathname} showFab={showFab}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/new" element={<PlantForm />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/plant/:id/edit" element={<PlantForm />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  )
}

function NotFound() {
  return (
    <div className="py-16 text-center text-soil-50/60">
      <p className="text-3xl">🍃</p>
      <p className="mt-2">Nothing here.</p>
      <Link to="/" className="mt-4 inline-block text-canopy-400">Back home</Link>
    </div>
  )
}
