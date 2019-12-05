import bolt from '@slack/bolt'
import { User } from '../db/models'

export async function handleUsers({ payload, body, context, say, next }, app: bolt.App) {
  if (process.env.NODE_ENV = 'dev') {
    console.log('payload', payload)
    console.log('context', context)
    console.log('body', body)
    console.log('\n\n')
  }
  // both channel and channel_id are used because slack API is not standardized on this key
  const { user, user_id, text } = payload
  const userId = user || user_id || body.user.id
  try {
    const user = await getUser(userId)
    if (!user) throw new Error('User not registered!')
    if (user.convoExpired) {
      say("It's been a while! I missed you (roar).")
    }
    context.user = user
    await setUser(user, text)
    next()
  } catch (e) {
    console.error(e.message)
    await registerNewUser(payload, body, say, context, app);
    next()
  }
};

async function registerNewUser(payload, body, say, context, app) {
  const userId = payload.user || payload.user_id || body.user.id;
  const channelId = payload.channel || payload.channel_id || body.channel.id;
  const teamId = payload.team || payload.team_id || body.team.id;
  console.log('Creating new User in DB...');
  console.log('userId', userId)
  const info = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: userId,
  })
  const { name, real_name , tz, tz_offset, profile: { display_name, image_192 }} = info.user
  const user = await User.create({
    userId,
    channelId,
    teamId,
    tz,
    tzOffset: tz_offset,
    lastMessage: { text: String(payload.text) },
    name,
    realName: real_name,
    displayName: display_name,
    avatar: image_192,
  })
  context.user = user
  await say(`Oh hey, ${context.user.displayName}! Nice to meet you, I'm pair bear! I went ahead and registered you in the database. Type \`help\` or \`Who are you?\` for more information about me.`)
  return user
}

async function getUser(channel) {
  const user = await User.findOneById(channel)
  if (user) {
    return user
  } else {
    throw new Error('User not found!')
  }
}

async function setUser(user, text) {
  user.lastMessage = {
    text: String(text),
    date: Date.now(),
  }
  user.expiresAt = new Date(Date.now() + (30 * 60 * 1000))
  await user.save()
}