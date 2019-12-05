import bolt from '@slack/bolt'
import { randomFact } from '../../lib/bearFacts'
import { handleUsers } from '../../middleware/handleUsers'

function randomResponse() {
  const greetings = [
    'Hello',
    'Hey',
    'What\'s up',
    'How are you?',
    'ROOOOOOOOOOOOOAR (scratches belly)',
    'I was just hibernating',
    'I\'m hungry. You got any campers I could snack on?',
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]
}

export async function greet(say) {
  await say(`${randomResponse()}! Did you know? ${randomFact()}`);
}

export default function greetingHandler (app: bolt.App) {
  app.message(/^(hello|hi|こんにちは|こんばんは|hey)$/i, async (args) => {
    await handleUsers(args, app)
    greet(args.say)
  });  
}
