import { z } from 'zod'

export const customerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
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
export type Customer = z.infer<typeof customerSchema>

export const customerFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email.').or(z.literal('')).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  active: z.boolean(),
})
export type CustomerForm = z.infer<typeof customerFormSchema>
