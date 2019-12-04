import { handleUsers } from '../../middleware/handleUsers'
import {
  showInviteOptions,
  showDenied,
  showReceived,
  showSent,
} from './invites'
import { createInviteModal } from './inviteModal'
import { User, Invite } from '../../db/models'
import { Confirmation } from '../../db/models/Invite'
import { Actions, Views } from '../../typings'
import serializeCreateInviteView from '../../lib/serializeCreateInviteView'

export default function invitesHandler(app)  {
  app.message(/^invites?/i, async (args) => {
    await handleUsers(args)
    await showInviteOptions(args)
  })
  
  app.command(`/invites`, async (args) => {
    args.ack()
    await handleUsers(args)
    switch (args.payload.text) {
      case 'received':
        return await showReceived(args)
      case 'show':
        return await showSent(args)
      default:
        await showInviteOptions(args)
    }
  })
  
  app.action(Actions.inviteShowDenied, async (args) => {
    args.ack()
    await handleUsers(args)
    await showDenied(args)
  })
  app.action(Actions.inviteShowReceived, async (args) => {
    args.ack()
    await handleUsers(args)
    await showReceived(args)
  })
  app.action(Actions.inviteShowSent, async (args) => {
    args.ack()
    await handleUsers(args)
    await showSent(args)
  })
  
  app.action(Actions.inviteConfirm, async (args) => {
    await handleUsers(args)
    const { ack, payload, context, say } = args;
    const invite = await Invite.findById(payload.value)
    invite.confirmation = Confirmation.confirmed
    await invite.save()
    ack()
    say("Invite has been confirmed!")
    say({ blocks: await invite.toBlocks(context.user.userId) })
  })
  
  app.action(Actions.inviteDeny, async (args) => {
    await handleUsers(args)
    const { ack, payload, context, say } = args;
    const invite = await Invite.findById(payload.value)
    invite.confirmation = Confirmation.denied
    await invite.save()
    ack()
    say("Invite has been denied")
    say({ blocks: await invite.toBlocks(context.user.userId) })
  })
  
  app.action(Actions.inviteCreate, async ({ ack, payload, body, context }) => {
    // Acknowledge the command request
    ack();
    const inviteModal = await createInviteModal()
    try {
      const result = app.client.views.open({
        token: context.botToken,
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: inviteModal,
      });
      console.log(result)
    }
    catch (error) {
      console.error(error)
    }
  });
  
  app.action(Actions.inviteDelete, async ({ ack, payload, context, body }) => {
    ack()
    const invite = await Invite.findById(payload.value)
    await invite.remove()
    const toUser = await User.findOneById(invite.to)
    // Notify from
    app.client.chat.postMessage({
      token: context.botToken,
      channel: body.channel.id,
      text: 'The invitation has been deleted',
    })
    app.client.chat.postMessage({
      token: context.botToken,
      channel: body.channel.id,
      blocks: await invite.toBlocks(body.user.userId)
    })
    // Notify to
    app.client.chat.postMessage({
      token: context.botToken,
      channel: toUser.channel,
      text: 'The invitation has been deleted',
    })
    app.client.chat.postMessage({
      token: context.botToken,
      channel: toUser.channel,
      blocks: await invite.toBlocks(toUser.userId)
    })
  })
  
  app.view(Views.inviteCreated, async ({ ack, payload, body, context }) => {
    ack();
    context.user = await User.findOneById(body.user.id)
    const { theme, day, toUserId, time } = serializeCreateInviteView(payload.state.values)
    const date = new Date(`${day} ${time} GMT+0900`)
    const toUser = await User.findOneById(toUserId)
    if (await toUser.currentInvite()) { 
      console.log('Invite already exists')
    } else {
      const invite = await Invite.create({
        theme,
        date,
        to: toUserId,
        from: context.user.userId,
        confirmation: Confirmation.unconfirmed,
      })
      // Notify from
      app.client.chat.postMessage({
        token: context.botToken,
        channel: context.user.channel,
        text: 'The invitation has been created',
      })
      app.client.chat.postMessage({
        token: context.botToken,
        channel: context.user.channel,
        blocks: await invite.toBlocks(context.user.userId)
      })
      // Notify to
      app.client.chat.postMessage({
        token: context.botToken,
        channel: toUser.channel,
        text: 'The invitation has been created',
      })
      app.client.chat.postMessage({
        token: context.botToken,
        channel: toUser.channel,
        blocks: await invite.toBlocks(toUser.userId)
      })
    }
  });
}