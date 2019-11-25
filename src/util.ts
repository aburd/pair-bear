export function hyphenate(d: Date): string {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}-${month}-${day}`
}
