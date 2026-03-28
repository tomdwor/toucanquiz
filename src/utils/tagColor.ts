/** djb2 hash → deterministic hue in [0, 360) for a tag string */
export function tagHue(tag: string): number {
  let h = 5381
  for (let i = 0; i < tag.length; i++) {
    h = ((h << 5) + h) ^ tag.charCodeAt(i)
  }
  return ((h % 360) + 360) % 360
}
