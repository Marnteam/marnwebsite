export const useResizeObserver = (target: Element | null, cb: () => void) => {
  if (!target) return () => {}
  const ro = new ResizeObserver(cb)
  ro.observe(target)
  return () => ro.disconnect()
}
