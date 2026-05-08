import { useEffect, useState } from 'react'

export const useDebouncedValue = <TValue,>(
  value: TValue,
  delayInMilliseconds: number,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayInMilliseconds)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [delayInMilliseconds, value])

  return debouncedValue
}
