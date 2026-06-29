import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="app-shell">
      <header className="container py-4">
        <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker Dashboard</h1>
        <p className="text-secondary mb-3">
          API base URL: <code>{apiBaseUrl}</code>
        </p>
        <nav className="nav nav-pills gap-2 app-nav">
          <NavLink to="/users" className="nav-link">Users</NavLink>
          <NavLink to="/teams" className="nav-link">Teams</NavLink>
          <NavLink to="/activities" className="nav-link">Activities</NavLink>
          <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
          <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
        </nav>
      </header>

      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
