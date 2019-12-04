export function capitalize(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function formatDate(d: Date): string {
  const MM = (d.getMonth() + 1).toString().padStart(2, "0")
  const DD = d.getDate().toString().padStart(2, "0")
  const hh = d.getHours().toString().padStart(2, "0")
  const mm = d.getMinutes().toString().padStart(2, "0")
  return `${MM}/${DD} ${hh}:${mm}`
}