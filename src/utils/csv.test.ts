import { describe, expect, it } from 'vitest'

import { createCsv } from './csv'

describe('createCsv', () => {
  it('escapes commas, quotes and line breaks', () => {
    expect(
      createCsv([
        ['Name', 'Notes'],
        ['Avery Stone', 'Works with Sales, People and Finance'],
        ['Maya "MJ" Chen', 'Line one\nLine two'],
      ]),
    ).toBe(
      'Name,Notes\r\nAvery Stone,"Works with Sales, People and Finance"\r\n"Maya ""MJ"" Chen","Line one\nLine two"',
    )
  })
})
