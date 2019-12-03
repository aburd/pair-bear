export enum Actions {
  inviteShowReceived = "invite_show_received",
  inviteShowSent = "invite_show_sent",
  inviteConfirm = 'invite_confirm',
  inviteDeny = 'invite_deny',
  inviteCreateInvite = 'invite_create_invite',
  inviteShowEngineers = 'invite_show_engineers',
}

export enum Views {
  inviteCreated = 'invite_created'
}

export interface SlackOption {
  text: {
    type: string
    text: string
  }
  value: string
}