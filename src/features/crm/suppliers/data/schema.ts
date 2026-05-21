import { z } from 'zod'

export const supplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  contact_name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  active: z.boolean().default(true),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type Supplier = z.infer<typeof supplierSchema>

export const supplierFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  contact_name: z.string().optional(),
  email: z.string().email('Invalid email.').or(z.literal('')).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  active: z.boolean(),
})
export type SupplierForm = z.infer<typeof supplierFormSchema>
