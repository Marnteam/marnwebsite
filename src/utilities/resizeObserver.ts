export function attachResizeObserver(node: Element | null, callback: () => void): () => void {
  if (!node) return () => {}
  const ro = new ResizeObserver(callback)
  ro.observe(node)
  return () => ro.disconnect()
}
