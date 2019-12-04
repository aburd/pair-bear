import cron from 'node-cron'
import invites from './invites'

export default function(app) {
  cron.schedule('* * * * *', () => invites.remindConfirmed(app));
}