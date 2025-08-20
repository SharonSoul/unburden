import { Circle, PromptChip, CrisisResource } from '@/types'

export const seedCircles: Circle[] = [
  {
    id: '1',
    slug: 'alcohol',
    name: 'Alcohol',
    description: 'Space to talk cravings, slips, and support—no judgment.',
    tags: ['substance', 'cravings'],
    peakHours: ['19:00-23:00'],
    moderators: ['mod_01', 'mod_02'],
    schedule: [
      { type: 'guided', dow: [1, 4], time: '20:00' },
      { type: 'share', dow: [0, 3], time: '19:00' }
    ],
    activeCount: 12,
    mood: 'supportive',
    isLive: true
  },
  {
    id: '2',
    slug: 'shopping',
    name: 'Shopping Addiction',
    description: 'Untangle impulse buys and debt shame with practical next steps.',
    tags: ['finance', 'impulse'],
    peakHours: ['18:00-22:00'],
    moderators: ['mod_03'],
    schedule: [
      { type: 'guided', dow: [2], time: '19:30' },
      { type: 'share', dow: [0, 3], time: '21:00' }
    ],
    activeCount: 8,
    mood: 'calm',
    isLive: false
  },
  {
    id: '3',
    slug: 'gambling',
    name: 'Gambling',
    description: 'Share wins, losses, and honest check-ins about urges.',
    tags: ['money', 'casino', 'sports'],
    peakHours: ['17:00-23:00'],
    moderators: ['mod_02'],
    schedule: [
      { type: 'guided', dow: [0, 3], time: '21:00' },
      { type: 'open', dow: [5], time: '22:00' }
    ],
    activeCount: 15,
    mood: 'active',
    isLive: true
  },
  {
    id: '4',
    slug: 'sex',
    name: 'Sex & Porn',
    description: 'Talk habits, boundaries, and slips—without shame.',
    tags: ['sexual', 'internet'],
    peakHours: ['21:00-01:00'],
    moderators: ['mod_05'],
    schedule: [
      { type: 'guided', dow: [5], time: '22:00' },
      { type: 'share', dow: [1, 4], time: '21:00' }
    ],
    activeCount: 6,
    mood: 'calm',
    isLive: false
  },
  {
    id: '5',
    slug: 'gaming',
    name: 'Gaming',
    description: 'Balance fun and life. Vent, reset goals, and get support.',
    tags: ['dopamine', 'time'],
    peakHours: ['16:00-23:00'],
    moderators: ['mod_06'],
    schedule: [
      { type: 'guided', dow: [6], time: '18:00' },
      { type: 'open', dow: [2, 5], time: '20:00' }
    ],
    activeCount: 20,
    mood: 'busy',
    isLive: true
  },
  {
    id: '6',
    slug: 'nicotine',
    name: 'Nicotine/Vape',
    description: 'Cravings, patches, and the journey to freedom.',
    tags: ['substance', 'habit'],
    peakHours: ['07:00-10:00', '20:00-23:00'],
    moderators: ['mod_04'],
    schedule: [
      { type: 'share', dow: [1, 5], time: '20:00' },
      { type: 'guided', dow: [2], time: '12:30' }
    ],
    activeCount: 18,
    mood: 'supportive',
    isLive: true
  },
  {
    id: '7',
    slug: 'work',
    name: 'Workaholism',
    description: 'Untangle overwork, burnout, and boundaries.',
    tags: ['burnout', 'productivity'],
    peakHours: ['12:00-21:00'],
    moderators: ['mod_07'],
    schedule: [
      { type: 'guided', dow: [2], time: '12:30' },
      { type: 'share', dow: [1, 4], time: '19:00' }
    ],
    activeCount: 10,
    mood: 'calm',
    isLive: false
  },
  {
    id: '8',
    slug: 'social',
    name: 'Social Media Doomscroll',
    description: 'Break loops, reclaim focus, and celebrate small wins.',
    tags: ['screen', 'dopamine'],
    peakHours: ['20:00-00:00'],
    moderators: ['mod_01'],
    schedule: [
      { type: 'open', dow: [3], time: '21:00' },
      { type: 'guided', dow: [6], time: '17:00' }
    ],
    activeCount: 25,
    mood: 'active',
    isLive: true
  },
  {
    id: '9',
    slug: 'food',
    name: 'Food & Binge',
    description: 'Gentle talk about urges, guilt, and body kindness.',
    tags: ['eating', 'body'],
    peakHours: ['19:00-23:00'],
    moderators: ['mod_03'],
    schedule: [
      { type: 'share', dow: [0, 4], time: '19:00' },
      { type: 'guided', dow: [2], time: '20:00' }
    ],
    activeCount: 14,
    mood: 'supportive',
    isLive: false
  },
  {
    id: '10',
    slug: 'ally',
    name: 'Ally Circle (Friends & Family)',
    description: 'How to support someone you love—listen first.',
    tags: ['family', 'support'],
    peakHours: ['18:00-22:00'],
    moderators: ['mod_08'],
    schedule: [
      { type: 'guided', dow: [6], time: '17:00' },
      { type: 'share', dow: [1, 4], time: '19:00' }
    ],
    activeCount: 9,
    mood: 'calm',
    isLive: false
  }
]

export const promptChips: PromptChip[] = [
  { id: '1', text: 'I need to vent', category: 'support' },
  { id: '2', text: 'I\'m fighting a craving', category: 'cravings' },
  { id: '3', text: 'I relapsed', category: 'support' },
  { id: '4', text: 'Small win today', category: 'celebration' },
  { id: '5', text: 'Need advice', category: 'support' },
  { id: '6', text: 'Feeling triggered', category: 'support' },
  { id: '7', text: 'Gratitude check-in', category: 'mindfulness' },
  { id: '8', text: 'Boundary setting', category: 'growth' }
]

export const crisisResources: CrisisResource[] = [
  {
    region: 'US',
    hotlines: [
      '988 - Suicide & Crisis Lifeline',
      '1-800-273-8255 - National Suicide Prevention Lifeline',
      '1-800-662-4357 - SAMHSA National Helpline'
    ],
    resources: [
      'Crisis Text Line: Text HOME to 741741',
      'Emergency: 911'
    ],
    disclaimer: 'These resources provide immediate crisis support. For ongoing mental health care, please consult with a licensed mental health professional.'
  },
  {
    region: 'CA',
    hotlines: [
      '1-833-456-4566 - Crisis Services Canada',
      '1-800-668-6868 - Kids Help Phone'
    ],
    resources: [
      'Crisis Text Line: Text HOME to 686868',
      'Emergency: 911'
    ],
    disclaimer: 'These resources provide immediate crisis support. For ongoing mental health care, please consult with a licensed mental health professional.'
  }
]
