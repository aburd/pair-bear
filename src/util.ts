export function hyphenate(d: Date, time: boolean = false): string {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  if (time) {
    const hours = d.getHours()
    const minutes = d.getMinutes()
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } else {
    return `${year}-${month}-${day}`
  }
}
