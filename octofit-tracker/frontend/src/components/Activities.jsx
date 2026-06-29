import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Activities({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchCollection(`${apiBaseUrl}/activities/`)
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
      <h2 className="h4 mb-3">Activities</h2>
      <p className="text-secondary">Total records: {count}</p>
      {status === 'loading' && <p>Loading activities...</p>}
      {status === 'error' && <p className="text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th className="text-end">Minutes</th>
                <th className="text-end">Calories</th>
                <th className="text-end">Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? `${item.activityType}-${item.occurredAt}`}>
                  <td>{item.user?.name ?? 'Unknown'}</td>
                  <td>{item.activityType}</td>
                  <td className="text-end">{item.durationMinutes}</td>
                  <td className="text-end">{item.caloriesBurned}</td>
                  <td className="text-end">{item.distanceKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
