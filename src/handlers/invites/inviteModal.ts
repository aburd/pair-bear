import moment from 'moment-timezone'
import { Invite } from '../../db/models'
import { Views, InviteField } from '../../typings'

export async function createInviteModal(context, time?, theme?, date?) {
  const options = await userOptions()
  const blocks = options.length
    ? [dateBlock(date, context.user.tz),
      timeBlock(time, context.user.tz),
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
      "action_id": InviteField.userId,
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
      "action_id": InviteField.theme,
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

function datepickerBlock(tz) {
  return {
    "type": "section",
    "block_id": "datepicker",
    "text": {
      "type": "mrkdwn",
      "text": "Pick a day to pair-program"
    },
    "accessory": {
      "type": "datepicker",
      "initial_date": moment().tz(tz).format('YYYY-MM-DD HH:mm'),
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    }
  }
}

function dateBlock(date: string = "", tz) {
  const initialDate = new Date()
  return {
    "type": "input",
    "block_id": InviteField.date,
    "element": {
      "type": "plain_text_input",
      "action_id": InviteField.date,
      "placeholder": {
        "type": "plain_text",
        "text": "YYYY-MM-DD"
      },
      "initial_value": date || moment.tz(tz).format('YYYY-MM-DD'),
    },
    "label": {
      "type": "plain_text",
      "text": "When do you want to pair program?",
    }
  }
}

function timeBlock(time: string = "", tz) {
  return {
    "type": "input",
    "block_id": InviteField.time,
    "element": {
      "type": "plain_text_input",
      "action_id": InviteField.time,
      "placeholder": {
        "type": "plain_text",
        "text": "hh:mm"
      },
      "initial_value": time || moment.tz(tz).format('HH:mm'),
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