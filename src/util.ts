import { InviteField } from './typings'

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

export function serializeCreateInviteView(viewStateValues) {
  const date = viewStateValues[InviteField.date][InviteField.date].value
  const theme = viewStateValues[InviteField.theme][InviteField.theme].value
  const time = viewStateValues[InviteField.time][InviteField.time].value
  const userId = viewStateValues[InviteField.userId][InviteField.userId].selected_option.value
  return {
    day: serializeDate(date),
    theme: serializeTheme(theme),
    time: serializeTime(time),
    toUserId: serializeUserId(userId),
  }
}

function serializeDate(userInput) {
  if (/\d{4}-\d{2}-\d{2}/.test(userInput)) {
    return userInput
  }
  throw new Error('Not a proper date')
}
function serializeTime(userInput) {
  if (/\d{2}:\d{2}/.test(userInput)) {
    return userInput
  }
  throw new Error('Not a proper time')
}
function serializeTheme(userInput) {
  if (userInput) return userInput
  throw new Error('The invitation needs a theme')
}
function serializeUserId(userInput) {
  if (typeof userInput === 'string' && userInput) return userInput
  throw new Error('The invitation needs an engineer')
}