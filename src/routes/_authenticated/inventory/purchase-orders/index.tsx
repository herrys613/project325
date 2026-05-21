import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { PurchaseOrders } from '@/features/inventory/purchase-orders'

const poSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  po_number: z.string().optional().catch(''),
  status: z
    .array(z.enum(['draft', 'sent', 'received', 'cancelled']))
    .optional()
    .catch([]),
})

export const Route = createFileRoute('/_authenticated/inventory/purchase-orders/')({
  validateSearch: poSearchSchema,
  component: PurchaseOrders,
})
