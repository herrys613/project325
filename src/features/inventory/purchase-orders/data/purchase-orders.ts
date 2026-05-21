import { faker } from '@faker-js/faker'
import { suppliers } from '@/features/crm/suppliers/data/suppliers'
import { type PurchaseOrder } from './schema'

faker.seed(300)

const poStatusValues = ['draft', 'sent', 'received', 'cancelled'] as const

function generatePO(): PurchaseOrder {
  const supplier = faker.helpers.arrayElement(suppliers)
  const orderDate = faker.date.past({ years: 1 })
  return {
    id: faker.string.uuid(),
    po_number: `PO-${faker.string.numeric(5)}`,
    supplier_id: supplier.id,
    supplier_name: supplier.name,
    status: faker.helpers.arrayElement(poStatusValues),
    order_date: orderDate,
    expected_date: faker.datatype.boolean({ probability: 0.7 })
      ? faker.date.soon({ days: 30, refDate: orderDate })
      : undefined,
    total_amount: parseFloat(
      faker.commerce.price({ min: 100, max: 50000 })
    ),
    notes: faker.datatype.boolean({ probability: 0.3 })
      ? faker.lorem.sentence()
      : undefined,
    created_at: orderDate,
    updated_at: faker.date.recent({ days: 30 }),
  }
}

export const purchaseOrders: PurchaseOrder[] = Array.from({ length: 40 }, generatePO)
