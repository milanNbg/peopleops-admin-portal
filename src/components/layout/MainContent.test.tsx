import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { MainContent } from './MainContent'

describe('MainContent', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the focusable main content landmark', () => {
    render(<MainContent>Page body</MainContent>)

    const mainContent = screen.getByRole('main')

    expect(mainContent).toHaveAttribute('id', 'main-content')
    expect(mainContent).toHaveAttribute('tabIndex', '-1')
    expect(mainContent).toHaveTextContent('Page body')

    mainContent.focus()

    expect(mainContent).toHaveFocus()
  })
})
