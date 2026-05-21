import { z } from 'zod'

export const poStatusSchema = z.enum(['draft', 'sent', 'received', 'cancelled'])
export type POStatus = z.infer<typeof poStatusSchema>

export const purchaseOrderSchema = z.object({
  id: z.string().uuid(),
  po_number: z.string().min(1),
  supplier_id: z.string().uuid(),
  supplier_name: z.string(),
  status: poStatusSchema,
  order_date: z.coerce.date(),
  expected_date: z.coerce.date().optional(),
  total_amount: z.number().min(0),
  notes: z.string().optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>

export const purchaseOrderFormSchema = z.object({
  po_number: z.string().min(1, 'PO number is required.'),
  supplier_id: z.string().min(1, 'Supplier is required.'),
  supplier_name: z.string().min(1),
  status: poStatusSchema,
  order_date: z.string().min(1, 'Order date is required.'),
  expected_date: z.string().optional(),
  total_amount: z.coerce.number().min(0, 'Amount must be 0 or more.'),
  notes: z.string().optional(),
})
export type PurchaseOrderForm = z.infer<typeof purchaseOrderFormSchema>
