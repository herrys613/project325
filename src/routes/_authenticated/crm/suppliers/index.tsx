import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Suppliers } from '@/features/crm/suppliers'

const suppliersSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  name: z.string().optional().catch(''),
  active: z.array(z.union([z.literal('true'), z.literal('false')])).optional().catch([]),
})

export const Route = createFileRoute('/_authenticated/crm/suppliers/')({
  validateSearch: suppliersSearchSchema,
  component: Suppliers,
})
