export function hyphenate(d: Date, time: boolean = false): string {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  if (time) {
    const hours = d.getHours().toString().padStart(2, "0")
    const minutes = d.getMinutes().toString().padStart(2, "0")
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } else {
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  }
}
