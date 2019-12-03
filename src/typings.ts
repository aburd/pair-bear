export enum Actions {
  inviteShowDenied = "invite_show_denied",
  inviteShowReceived = "invite_show_received",
  inviteShowSent = "invite_show_sent",
  inviteConfirm = 'invite_confirm',
  inviteDeny = 'invite_deny',
  inviteCreateInvite = 'invite_create_invite',
  inviteShowEngineers = 'invite_show_engineers',
  inviteDateAdded = 'invite_date_added',
}

export enum Views {
  inviteCreated = 'invite_created'
}

export enum InviteField {
  theme = 'theme',
  date = 'date',
  time = 'time',
  userId = 'user_id',
}

export interface SlackOption {
  text: {
    type: string
    text: string
  }
  value: string
}