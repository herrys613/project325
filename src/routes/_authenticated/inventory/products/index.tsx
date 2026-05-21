import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Products } from '@/features/inventory/products'
import { categories } from '@/features/inventory/products/data/data'

const productsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  sku: z.string().optional().catch(''),
  category: z
    .array(z.enum(categories.map((c) => c.value) as [string, ...string[]]))
    .optional()
    .catch([]),
  stock_status: z
    .array(z.union([z.literal('in_stock'), z.literal('low_stock'), z.literal('out_of_stock')]))
    .optional()
    .catch([]),
  active: z.array(z.union([z.literal('true'), z.literal('false')])).optional().catch([]),
})

export const Route = createFileRoute('/_authenticated/inventory/products/')({
  validateSearch: productsSearchSchema,
  component: Products,
})
