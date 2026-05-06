export const mockDelay = (duration = 300) =>
  new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, duration)
  })
