import { Invite } from '../db/models'
import { Views } from '../typings'

export async function createInviteModal() {
  const options = await userOptions()
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
    "blocks": options.length
      ? [
        themeBlock(),
        await engineerBlock(options),
        datepickerBlock(),
        timeBlock(),
      ]
      : [sorryBlock()]
  }
}

async function engineerBlock(engineerOptions) {
  return {
    "type": "input",
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Takakuda",
        emoji: true,
      },
      "options": engineerOptions
  },
    "label": {
      "type": "plain_text",
      "text": "Takakuda",
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

function themeBlock() {
  return {
    "type": "input",
    "element": {
      "type": "plain_text_input",
      "action_id": "theme",
      "placeholder": {
        "type": "plain_text",
        "text": "What is the theme of the pair-programming?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Theme"
    }
  }
}

function datepickerBlock() {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Pick a day to pair-program"
    },
    "accessory": {
      "type": "datepicker",
      "initial_date": "1990-04-28",
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    }
  }
}

function timeBlock() {
  return {
    "type": "input",
    "element": {
      "type": "plain_text_input",
      "action_id": "time",
      "placeholder": {
        "type": "plain_text",
        "text": "hh:mm"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "What time do you want to pair program?",
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