import { createFileRoute } from '@tanstack/react-router'
import { Shipments } from '@/features/sales'

export const Route = createFileRoute('/_authenticated/sales/shipments/')({
  component: Shipments,
})
