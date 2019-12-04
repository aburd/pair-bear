import bolt from '@slack/bolt'

export function btnBlock(label, text, actionId) {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": label,
    },
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": text,
      },
      "action_id": actionId,
    }
  }
}
