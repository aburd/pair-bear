export default {
  "type": "modal",
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
  "blocks": [
    {
      "type": "input",
      "element": {
        "type": "multi_channels_select",
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
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Pick an engineer to pair-program with"
      },
      "accessory": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Takakuda",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 1",
              "emoji": true
            },
            "value": "value-0"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 2",
              "emoji": true
            },
            "value": "value-1"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 3",
              "emoji": true
            },
            "value": "value-2"
          }
        ]
      }
    },
    {
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
    },
    {
      "type": "input",
      "element": {
        "type": "multi_channels_select",
        "action_id": "theme",
        "placeholder": {
          "type": "plain_text",
          "text": "hh:mm"
        }
      },
      "label": {
        "type": "plain_text",
        "text": "What time do you want to pair program?",
        "emoji": true
      }
    }
  ]
}