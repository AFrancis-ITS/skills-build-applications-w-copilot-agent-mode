export function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

export function getCount(payload, itemsLength) {
  if (payload && typeof payload === 'object' && Number.isFinite(payload.count)) {
    return payload.count
  }

  return itemsLength
}

export async function fetchCollection(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const items = normalizeItems(payload)

  return {
    items,
    count: getCount(payload, items.length),
  }
}
