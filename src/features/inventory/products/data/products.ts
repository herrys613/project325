import { faker } from '@faker-js/faker'
import { type Product } from './schema'
import { categories } from './data'

faker.seed(42)

const categoryValues = categories.map((c) => c.value)

function generateProduct(): Product {
  const stock = faker.number.int({ min: 0, max: 500 })
  const reorderLevel = faker.number.int({ min: 5, max: 50 })
  const costPrice = parseFloat(faker.commerce.price({ min: 1, max: 500 }))
  const unitPrice = parseFloat(
    (costPrice * faker.number.float({ min: 1.1, max: 2.5, fractionDigits: 2 })).toFixed(2)
  )

  return {
    id: faker.string.uuid(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    barcode: faker.datatype.boolean({ probability: 0.7 })
      ? faker.string.numeric(13)
      : undefined,
    name: faker.commerce.productName(),
    description: faker.datatype.boolean({ probability: 0.6 })
      ? faker.commerce.productDescription()
      : undefined,
    category: faker.helpers.arrayElement(categoryValues),
    unit_price: unitPrice,
    cost_price: costPrice,
    stock_quantity: stock,
    reorder_level: reorderLevel,
    active: faker.datatype.boolean({ probability: 0.85 }),
    created_at: faker.date.past({ years: 2 }),
    updated_at: faker.date.recent({ days: 90 }),
  }
}

export const products: Product[] = Array.from({ length: 100 }, generateProduct)
