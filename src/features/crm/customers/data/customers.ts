import { faker } from '@faker-js/faker'
import { type Customer } from './schema'
import { countries } from './data'

faker.seed(100)

const countryValues = countries.map((c) => c.value)

function generateCustomer(): Customer {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    email: faker.datatype.boolean({ probability: 0.85 })
      ? faker.internet.email()
      : undefined,
    phone: faker.datatype.boolean({ probability: 0.75 })
      ? faker.phone.number()
      : undefined,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.helpers.arrayElement(countryValues),
    notes: faker.datatype.boolean({ probability: 0.4 })
      ? faker.lorem.sentence()
      : undefined,
    active: faker.datatype.boolean({ probability: 0.9 }),
    created_at: faker.date.past({ years: 3 }),
    updated_at: faker.date.recent({ days: 60 }),
  }
}

export const customers: Customer[] = Array.from({ length: 50 }, generateCustomer)
