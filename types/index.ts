export interface Circle {
  id: string
  slug: string
  name: string
  description: string
  tags: string[]
  peakHours: string[]
  moderators: string[]
  schedule: SessionSchedule[]
  activeCount?: number
  mood?: string
  isLive?: boolean
}

export interface SessionSchedule {
  type: 'open' | 'guided' | 'share'
  dow: number[] // days of week (0-6)
  time: string
}

export interface Session {
  id: string
  circleId: string
  type: 'open' | 'guided' | 'share'
  startedAt: string
  mood: string
  isActive: boolean
  participants: number
}

export interface Message {
  id: string
  sessionId: string
  userId?: string
  displayName: string
  body: string
  createdAt: string
  isBlurred: boolean
  flags: string[]
  reactions: Reaction[]
}

export interface Reaction {
  type: string
  count: number
  hasReacted?: boolean
}

export interface User {
  id: string
  pseudonym: string
  anonPreference: boolean
  avatarSeed: string
  createdAt: string
}

export interface JournalEntry {
  id: string
  userId?: string
  title?: string
  body: string
  createdAt: string
  linksToSession?: string[]
}

export interface Report {
  id: string
  messageId: string
  reason: string
  reporterId?: string
  status: 'pending' | 'reviewed' | 'resolved'
}

export interface Preference {
  userId: string
  triggerKeywords: string[]
  retentionDays: number
  notifications: NotificationSettings
}

export interface NotificationSettings {
  enabled: boolean
  quietHours: {
    start: string
    end: string
  }
  types: {
    circleLive: boolean
    checkInReminders: boolean
    journalReminders: boolean
  }
}

export interface PromptChip {
  id: string
  text: string
  category: string
}

export interface CrisisResource {
  region: string
  hotlines: string[]
  resources: string[]
  disclaimer: string
}
