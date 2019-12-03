import { InviteField } from '../typings'

export default function serializeCreateInviteView(viewStateValues) {
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