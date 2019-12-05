## Pair Bear

A chatbot which will set up pair programming sessions on your team.

This is a typescript project which uses:
- `@slack/bolt`: For slack integration
- `mongoose/MongoDB`: For storage

## Installation

### Registering your ChatApp on Slack

1. Visit `https://api.slack.com/apps?new_app=1`
2. Follow this [Getting Started Guide](https://slack.dev/bolt/tutorial/getting-started)
3. Make sure to get your Slack "Signing Secret" and "Bot Token"

### Starting the chatbot server

1. git clone
2. cd
3. yarn
4. yarn dev

### Forwarding HTTPS Traffic to your local dev server

1. Download ngrok
2. Run `ngrok http 3000`
3. Register the ngrok tunnel url on your slack app

## Slackbot/DB Integration

Set the proper environment variables by making a `.env` file in the root of this project. 
An example is provided in the root.

For Slack information: https://api.slack.com
For MongoDB, I suggest using mLab: https://mlab.com

## DB

```
mongodb://<dbuser>:<dbpassword>@<dbdomain>/<dbname>
mongo <dbdomain>/<dbname> -u <dbuser> -p <dbpassword>
```

# Needs (completed is checked)

## Development

- [ ] CI
- [ ] Basic testing

## Functionality

### A. Sending Invite

- [x] All users are contacted on Monday of every week with a message to set up their pair programming activity for the week
- [x] The engineers who have not setup their pair programming yet are listed to the user. 
- [x] The user must choose one engineer to pair program with.
- [ ] After, they must choose two *ranked* daytimes to pair program.
- [x] The user must enter a topic they'd like to focus on.
- [ ] Optionally they can also send a message along with the invitation.
- [x] After the user confirms, the message is sent to the invitee.

### B. Receiving Invite

- [x] The user receives an invite, and shows the details. At this point, the user either accepts, or rejects the invitation.
- [ ] Rejection can be sent with a special message if necessary.
- [ ] Rejection should start **[A. Sending Invite]** process again with the sender
- [ ] On accept, the user must pick one of the ranked daytimes to program. If neither are satisfactory, the user has the option of suggesting new daytimes.
- [x] Once this is confirmed, a receipt is sent to the sender.

### C. Schedule Change

- [ ] Original sender is sent a message with invitee's suggestion for new days.
- [ ] pick one of the new suggestions
- [ ] send yet new suggestions
- [x] cancel invitation altogether

### D. Confirmed Invite Reminder

- [x] Once an invitation is confirmed, an appointment is created. 
- [x] Reminder messages are sent out 15 minutes before an appointment is scheduled for.
- [x] Reminder messages are sent out when the appointment starts

### E. Confirmed Invite Report

- [ ] The user may submit the report, or 24 hours after the appointment a request for a report will be sent.
- [ ] The report is just one textbox.

## References

- [@slack/bolt Framework](https://slack.dev/bolt/tutorial/getting-started)
- [node-cron](https://www.npmjs.com/package/node-cron)
