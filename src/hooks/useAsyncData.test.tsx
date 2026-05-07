import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useAsyncData } from './useAsyncData'

describe('useAsyncData', () => {
  it('loads async data successfully', async () => {
    const loadTeams = async () => ['Engineering', 'People']

    const { result } = renderHook(() =>
      useAsyncData(loadTeams, {
        errorMessage: 'Unable to load teams.',
        initialData: [],
      }),
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual(['Engineering', 'People'])
    expect(result.current.error).toBeNull()
  })

  it('sets a friendly error message when loading fails', async () => {
    const loadTeams = async (): Promise<string[]> => {
      throw new Error('Network unavailable')
    }

    const { result } = renderHook(() =>
      useAsyncData(loadTeams, {
        errorMessage: 'Unable to load teams.',
        initialData: [],
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual([])
    expect(result.current.error).toBe('Unable to load teams.')
  })
})
