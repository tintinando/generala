import { useState } from 'react'

function useLocalStorage(key, initialValue = '', expireTime = null) {
  const readValue = () => {
    if (typeof window == 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const data = JSON.parse(item)
        if (
          expireTime &&
          new Date().getTime() - data.time > expireTime * 1000
        ) {
          window.localStorage.removeItem(key)
          return initialValue
        }
        return data.value
      }
      return initialValue
    } catch (error) {
      console.warn(`Error reading LocalStorage key "${key}": `, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = (value) => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      )
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(
        key,
        JSON.stringify({
          value: newValue,
          time: new Date().getTime()
        })
      )
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
