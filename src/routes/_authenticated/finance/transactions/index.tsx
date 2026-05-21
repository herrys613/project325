import { createFileRoute } from '@tanstack/react-router'
import { Transactions } from '@/features/finance'

export const Route = createFileRoute('/_authenticated/finance/transactions/')({
  component: Transactions,
})
