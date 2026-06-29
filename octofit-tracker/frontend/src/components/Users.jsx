import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Users() {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  useEffect(() => {
    let active = true

    fetchCollection(endpoint)
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
  }, [endpoint])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <p className="text-secondary">Total records: {count}</p>
      {status === 'loading' && <p>Loading users...</p>}
      {status === 'error' && <p className="text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
                <th className="text-end">Points</th>
                <th className="text-end">Weekly Minutes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? item.email}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.fitnessLevel}</td>
                  <td className="text-end">{item.totalPoints}</td>
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

export default Users
