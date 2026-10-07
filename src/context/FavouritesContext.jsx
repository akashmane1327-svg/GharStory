import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ghar-story:favourites'
const FavouritesContext = createContext(null)

function readStoredFavourites() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function FavouritesProvider({ children }) {
  const [favouriteIds, setFavouriteIds] = useState(readStoredFavourites)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds))
    } catch {
      // Storage may be unavailable (private browsing, quota) - fail silently.
    }
  }, [favouriteIds])

  const isFavourite = useCallback(
    (id) => favouriteIds.includes(id),
    [favouriteIds]
  )

  const toggleFavourite = useCallback((id) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    )
  }, [])

  const value = useMemo(
    () => ({ favouriteIds, isFavourite, toggleFavourite, favouriteCount: favouriteIds.length }),
    [favouriteIds, isFavourite, toggleFavourite]
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext)
  if (!ctx) {
    throw new Error('useFavourites must be used within a FavouritesProvider')
  }
  return ctx
}
