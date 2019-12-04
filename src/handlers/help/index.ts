import { handleUsers } from '../../middleware/handleUsers'

export async function help(say) {
  await say(`I'm Pair-Bear, a bear that helps out with pair-programming.
    My primary function is to manage "invites" to pair-programming from your fellow programmers.
    
    Usage:
    1. Create an invite to invite someone else to pair-programming
    2. Or wait for someone else to invite you
    3. Accept an invitation, and I'll remind you when it's time to pair program
    4. After pair-programming, be sure to leave feedback!

    Maybe you can try these commands:
    Say:
    \`help\` to see these options again
    \`hello\` for a great bear greeting!
    \`invites\` or \`/invites\` to see any information associated with "invites"`
  )
}

export default function helpHandler(app) {
  app.message(/help|who are you\??/i, async (args) => {
    await handleUsers(args)
    await help(args.say)
  })
}