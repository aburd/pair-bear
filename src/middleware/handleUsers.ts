import { User } from '../db/models'

export async function handleUsers({ payload, context, say, next }) {
  if (process.env.NODE_ENV = 'dev') {
    console.log('payload', payload);
    console.log('context', context);
    console.log('\n\n')
  }
  const { channel, text } = payload
  try {
    const user = await getUser(channel)
    if (!user) throw new Error('User not registered!')
    if (user.convoExpired) {
      say("It's been a while! I missed you (roar).")
    }
    context.user = user
    await setUser(user, text)
    next()
  } catch (e) {
    console.error(e.message)
    registerNewUser(payload, say);
  }
};

async function registerNewUser(payload, say) {
  const userId = payload.user;
  console.log('Creating new User in DB...');
  const user = await User.create({
    userId,
    channel: payload.channel,
    team: payload.team,
    lastMessage: { text: payload.text }
  })
  await say(`Oh hey, <@${user.userId}>! Nice to meet you! I went ahead and registered you in the database. Type \`help\` for more information`)
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