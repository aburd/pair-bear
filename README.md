## Pair Bear

A chatbot which will set up pair programming sessions on your team.

This is a typescript project which uses:
- `@slack/bolt`: For slack integration
- `mongoose/MongoDB`: For storage

## Installation

1. git clone
2. cd
3. yarn
4. yarn dev

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

## References

#### Project Outline
https://zeals.docbase.io/posts/957871

#### About Slack's Bolt Framework
https://slack.dev/bolt/tutorial/getting-started
