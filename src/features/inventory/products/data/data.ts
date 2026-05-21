import { type ProductStatus } from './schema'

export const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Food & Beverage', value: 'food_beverage' },
  { label: 'Tools & Hardware', value: 'tools_hardware' },
  { label: 'Office Supplies', value: 'office_supplies' },
  { label: 'Health & Beauty', value: 'health_beauty' },
  { label: 'Sports & Outdoors', value: 'sports_outdoors' },
  { label: 'Home & Garden', value: 'home_garden' },
  { label: 'Automotive', value: 'automotive' },
  { label: 'Other', value: 'other' },
]

export const stockStatusStyles = new Map<ProductStatus, string>([
  [
    'in_stock',
    'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  ],
  [
    'low_stock',
    'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200',
  ],
  [
    'out_of_stock',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const stockStatusLabels: Record<ProductStatus, string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
}

export function getStockStatus(
  stock: number,
  reorderLevel: number
): ProductStatus {
  if (stock === 0) return 'out_of_stock'
  if (stock <= reorderLevel) return 'low_stock'
  return 'in_stock'
}
