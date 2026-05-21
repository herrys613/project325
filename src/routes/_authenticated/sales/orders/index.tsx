import { createFileRoute } from '@tanstack/react-router'
import { SalesOrders } from '@/features/sales'

export const Route = createFileRoute('/_authenticated/sales/orders/')({
  component: SalesOrders,
})
