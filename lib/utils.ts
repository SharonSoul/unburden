import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePseudonym(): string {
  const adjectives = [
    'Calm', 'Quiet', 'Mint', 'Soft', 'Gentle', 'Warm', 'Safe', 'Peaceful',
    'Serene', 'Tranquil', 'Comforting', 'Supportive', 'Understanding', 'Patient'
  ]
  
  const nouns = [
    'River', 'Palm', 'Sky', 'Ocean', 'Mountain', 'Forest', 'Garden', 'Harbor',
    'Cove', 'Meadow', 'Valley', 'Spring', 'Sunset', 'Dawn'
  ]
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  
  return `${randomAdjective}-${randomNoun}`
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

export function getDayOfWeek(dayNumber: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayNumber]
}

export function getMoodColor(mood: string): string {
  const moodColors: Record<string, string> = {
    'calm': 'text-seafoam',
    'active': 'text-coral',
    'busy': 'text-sand',
    'supportive': 'text-seafoam',
    'heated': 'text-coral'
  }
  return moodColors[mood] || 'text-mist'
}

export function getMoodIcon(mood: string): string {
  const moodIcons: Record<string, string> = {
    'calm': '🌊',
    'active': '🔥',
    'busy': '⚡',
    'supportive': '🤗',
    'heated': '💬'
  }
  return moodIcons[mood] || '💭'
}
