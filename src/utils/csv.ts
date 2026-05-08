export type CsvCell = string | number | boolean | null | undefined

const escapeCsvCell = (cell: CsvCell) => {
  const value = cell == null ? '' : String(cell)
  const escapedValue = value.replaceAll('"', '""')
  const shouldQuote = /[",\r\n]/.test(escapedValue)

  return shouldQuote ? `"${escapedValue}"` : escapedValue
}

export const createCsv = (rows: CsvCell[][]) =>
  rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
