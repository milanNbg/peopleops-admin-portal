import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDebouncedValue } from './useDebouncedValue'

type DebouncedValueHarnessProps = {
  value: string
}

const DebouncedValueHarness = ({ value }: DebouncedValueHarnessProps) => {
  const debouncedValue = useDebouncedValue(value, 300)

  return <output aria-label="debounced value">{debouncedValue}</output>
}

describe('useDebouncedValue', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('updates the returned value after the debounce delay', () => {
    vi.useFakeTimers()

    const { rerender } = render(<DebouncedValueHarness value="initial" />)

    expect(screen.getByLabelText('debounced value')).toHaveTextContent('initial')

    rerender(<DebouncedValueHarness value="updated" />)

    expect(screen.getByLabelText('debounced value')).toHaveTextContent('initial')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByLabelText('debounced value')).toHaveTextContent('updated')
  })
})
