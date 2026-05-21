import { createFileRoute } from '@tanstack/react-router'
import { Payments } from '@/features/finance'

export const Route = createFileRoute('/_authenticated/finance/payments/')({
  component: Payments,
})
