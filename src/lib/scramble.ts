const SHIFT = 666

function shift(str: string, by: number): string {
  return str
    .split('')
    .map(ch => String.fromCharCode(ch.charCodeAt(0) + by))
    .join('')
}

export function scramble(data: unknown): string {
  return shift(JSON.stringify(data), SHIFT)
}

export function unscramble<T>(str: string): T {
  return JSON.parse(shift(str, -SHIFT))
}
