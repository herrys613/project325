import { type POStatus } from './schema'

export const poStatuses: { label: string; value: POStatus }[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Received', value: 'received' },
  { label: 'Cancelled', value: 'cancelled' },
]

export const poStatusStyles: Record<POStatus, string> = {
  draft: 'border-neutral-300 bg-neutral-100/50 text-neutral-700 dark:text-neutral-300',
  sent: 'border-blue-200 bg-blue-100/30 text-blue-900 dark:text-blue-300',
  received: 'border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200',
  cancelled: 'border-destructive/30 bg-destructive/10 text-destructive',
}
