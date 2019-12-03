import { Invite } from '../db/models'
import { Actions, Views, InviteField } from '../typings'
import { hyphenate } from '../util'

export async function createInviteModal(time?, theme?, date?) {
  const options = await userOptions()
  const blocks = options.length
    ? [dateBlock(date),
       timeBlock(time),
       themeBlock(theme),
       await engineerBlock(options)]
    : [sorryBlock()]
  return {
    "type": "modal",
    "callback_id": Views.inviteCreated,
    "title": {
      "type": "plain_text",
      "text": "Create an Invitation",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Create",
      "emoji": true
    },
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": blocks,
  }
}

async function engineerBlock(engineerOptions) {
  return {
    "type": "input",
    "block_id": InviteField.userId,
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Takakuda",
        emoji: true,
      },
      "options": engineerOptions,
  },
    "label": {
      "type": "plain_text",
      "text": "Choose an engineer",
      "emoji": true
    }
  }
}

async function userOptions() {
  return await Invite.notInvitedUsers()
    .then(users => users.map(u => u.toSlackOption()))
    .catch(e => {
      console.error(e)
      return [{
        text: {
          type: 'plain_text',
          text: e.message
        },
        value: 'error'
      }]
    })
}

function themeBlock(theme: string = "") {
  return {
    "type": "input",
    "block_id": InviteField.theme,
    "element": {
      "type": "plain_text_input",
      "action_id": "theme",
      "placeholder": {
        "type": "plain_text",
        "text": "What is the theme of the pair-programming?"
      },
      "initial_value": theme,
    },
    "label": {
      "type": "plain_text",
      "text": "Theme"
    }
  }
}

function datepickerBlock() {
  const initialDate = new Date()
  return {
    "type": "section",
    "block_id": "datepicker",
    "text": {
      "type": "mrkdwn",
      "text": "Pick a day to pair-program"
    },
    "accessory": {
      "type": "datepicker",
      "initial_date": hyphenate(initialDate),
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    }
  }
}

function dateBlock(date: string = "") {
  const initialDate = new Date()
  return {
    "type": "input",
    "block_id": InviteField.date,
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "YYYY-MM-DD"
      },
      "initial_value": date || hyphenate(initialDate),
    },
    "label": {
      "type": "plain_text",
      "text": "What time do you want to pair program?",
    }
  }
}

function timeBlock(time: string = "") {
  const d = new Date()
  const hh = d.getHours()
  const mm = d.getMinutes()
  return {
    "type": "input",
    "block_id": InviteField.time,
    "element": {
      "type": "plain_text_input",
      "action_id": "time",
      "placeholder": {
        "type": "plain_text",
        "text": "hh:mm"
      },
      "initial_value": time || `${hh}:${mm}`,
    },
    "label": {
      "type": "plain_text",
      "text": "What time do you want to pair program?"
    }
  }
}

function sorryBlock() {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Sorry, there aren't any engineers who are ready to program."
    }
  }
}