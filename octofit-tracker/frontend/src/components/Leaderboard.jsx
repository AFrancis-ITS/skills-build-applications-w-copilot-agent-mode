import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Leaderboard({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchCollection(`${apiBaseUrl}/leaderboard/`)
      .then((result) => {
        if (!active) return
        setItems(result.items)
        setCount(result.count)
        setStatus('ready')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <p className="text-secondary">Total records: {count}</p>
      {status === 'loading' && <p>Loading leaderboard...</p>}
      {status === 'error' && <p className="text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="text-end">Rank</th>
                <th>User</th>
                <th>Team</th>
                <th className="text-end">Points</th>
                <th className="text-end">Weekly Minutes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? `${item.rank}-${item.user?.name}`}>
                  <td className="text-end">{item.rank}</td>
                  <td>{item.user?.name ?? 'Unknown'}</td>
                  <td>{item.team?.name ?? 'Unknown'}</td>
                  <td className="text-end">{item.points}</td>
                  <td className="text-end">{item.weeklyMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
