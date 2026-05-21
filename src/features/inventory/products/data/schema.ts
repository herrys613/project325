import { z } from 'zod'

const productStatusSchema = z.union([
  z.literal('in_stock'),
  z.literal('low_stock'),
  z.literal('out_of_stock'),
])
export type ProductStatus = z.infer<typeof productStatusSchema>

export const productSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1),
  barcode: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string(),
  unit_price: z.number().min(0),
  cost_price: z.number().min(0),
  stock_quantity: z.number().int().min(0),
  reorder_level: z.number().int().min(0),
  active: z.boolean().default(true),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type Product = z.infer<typeof productSchema>

export const productFormSchema = z.object({
  sku: z.string().min(1, 'SKU is required.'),
  barcode: z.string().optional(),
  name: z.string().min(1, 'Name is required.'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required.'),
  unit_price: z.coerce.number().min(0, 'Unit price must be 0 or more.'),
  cost_price: z.coerce.number().min(0, 'Cost price must be 0 or more.'),
  stock_quantity: z.coerce.number().int().min(0, 'Stock must be 0 or more.'),
  reorder_level: z.coerce
    .number()
    .int()
    .min(0, 'Reorder level must be 0 or more.'),
  active: z.boolean(),
})
export type ProductForm = z.infer<typeof productFormSchema>
