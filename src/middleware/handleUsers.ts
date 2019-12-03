import { User } from '../db/models'

export async function handleUsers({ payload, body, context, say, next }) {
  if (process.env.NODE_ENV = 'dev') {
    console.log('payload', payload)
    console.log('context', context)
    console.log('body', body)
    console.log('\n\n')
  }
  // both channel and channel_id are used because slack API is not standardized on this key
  const { channel, channel_id, text } = payload
  try {
    const user = await getUser(channel || channel_id)
    if (!user) throw new Error('User not registered!')
    if (user.convoExpired) {
      say("It's been a while! I missed you (roar).")
    }
    context.user = user
    await setUser(user, text)
    next()
  } catch (e) {
    console.error(e.message)
    await registerNewUser(payload, say, context);
    next()
  }
};

async function registerNewUser(payload, say, context) {
  const userId = payload.user || payload.user_id;
  const channelId = payload.channel || payload.channel_id;
  const teamId = payload.team || payload.team_id;
  console.log('Creating new User in DB...');
  const user = await User.create({
    userId,
    channel: channelId,
    team: teamId,
    lastMessage: { text: payload.text }
  })
  context.user = user
  await say(`Oh hey, <@${user.userId}>! Nice to meet you, I'm pair bear! I went ahead and registered you in the database. Type \`help\` or \`Who are you?\` for more information about me.`)
  return user
}

async function getUser(channel) {
  const user = await User.findOneByChannel(channel)
  if (user) {
    return user
  } else {
    throw new Error('User not found!')
  }
}

async function setUser(user, text) {
  user.lastMessage = {
    text,
    date: Date.now(),
  }
  user.expiresAt = new Date(Date.now() + (30 * 60 * 1000))
  await user.save()
}