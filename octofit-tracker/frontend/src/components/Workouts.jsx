import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Workouts() {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

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
      <h2 className="h4 mb-3">Workouts</h2>
      <p className="text-secondary">Total records: {count}</p>
      {status === 'loading' && <p>Loading workouts...</p>}
      {status === 'error' && <p className="text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Focus</th>
                <th>Intensity</th>
                <th className="text-end">Duration (min)</th>
                <th>Recommended Level</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? item.title}>
                  <td>{item.title}</td>
                  <td>{item.focusArea}</td>
                  <td>{item.intensity}</td>
                  <td className="text-end">{item.durationMinutes}</td>
                  <td>{item.recommendedForLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
