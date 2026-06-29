import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Teams({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchCollection(`${apiBaseUrl}/teams/`)
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
      <h2 className="h4 mb-3">Teams</h2>
      <p className="text-secondary">Total records: {count}</p>
      {status === 'loading' && <p>Loading teams...</p>}
      {status === 'error' && <p className="text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th className="text-end">Members</th>
                <th className="text-end">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? item.name}>
                  <td>{item.name}</td>
                  <td>{item.city}</td>
                  <td className="text-end">{Array.isArray(item.members) ? item.members.length : 0}</td>
                  <td className="text-end">{item.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
