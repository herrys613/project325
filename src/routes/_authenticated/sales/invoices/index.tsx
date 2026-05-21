import { createFileRoute } from '@tanstack/react-router'
import { Invoices } from '@/features/sales'

export const Route = createFileRoute('/_authenticated/sales/invoices/')({
  component: Invoices,
})
