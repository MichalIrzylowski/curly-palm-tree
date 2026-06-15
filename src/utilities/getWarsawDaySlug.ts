import type { OpeningHour } from '@/payload-types'

type DaySlug = OpeningHour['hours'][number]['day']

const WEEKDAY_TO_SLUG: Record<string, DaySlug> = {
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
  Sunday: 'sunday',
}

/**
 * Current weekday in the clinic's timezone (Sopot, Poland). Must be evaluated at
 * view time — these pages are statically generated, so a server-rendered "today"
 * is frozen at build time. Call this from the client so the highlight is always
 * correct, pinned to Europe/Warsaw regardless of the visitor's own timezone.
 */
export function getWarsawDaySlug(date: Date = new Date()): DaySlug {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    weekday: 'long',
  }).format(date)

  return WEEKDAY_TO_SLUG[weekday]
}
