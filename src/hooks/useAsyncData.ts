import { useEffect, useState } from 'react'

type UseAsyncDataOptions<TData> = {
  errorMessage: string
  initialData: TData
}

export const useAsyncData = <TData>(
  loader: () => Promise<TData>,
  { errorMessage, initialData }: UseAsyncDataOptions<TData>,
) => {
  const [data, setData] = useState<TData>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)

      try {
        const nextData = await loader()

        if (isMounted) {
          setData(nextData)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError(errorMessage)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [errorMessage, loader])

  return { data, error, isLoading }
}
