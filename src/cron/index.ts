import cron from 'node-cron'
import invites from './invites'

export default function(app) {
  cron.schedule('* * * * *', () => invites.remindConfirmed(app));
  cron.schedule('* * * * *', () => invites.remindFifteenMinutesBefore(app));
  cron.schedule('0 10 * * Monday', () => invites.sendCreateReminder(app), { timezone: "Asia/Tokyo" });
}