import { faker } from '@faker-js/faker'
import { type Supplier } from './schema'
import { countries } from './data'

faker.seed(200)

const countryValues = countries.map((c) => c.value)

function generateSupplier(): Supplier {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    contact_name: faker.datatype.boolean({ probability: 0.8 })
      ? faker.person.fullName()
      : undefined,
    email: faker.datatype.boolean({ probability: 0.85 })
      ? faker.internet.email()
      : undefined,
    phone: faker.datatype.boolean({ probability: 0.75 })
      ? faker.phone.number()
      : undefined,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.helpers.arrayElement(countryValues),
    notes: faker.datatype.boolean({ probability: 0.35 })
      ? faker.lorem.sentence()
      : undefined,
    active: faker.datatype.boolean({ probability: 0.88 }),
    created_at: faker.date.past({ years: 3 }),
    updated_at: faker.date.recent({ days: 60 }),
  }
}

export const suppliers: Supplier[] = Array.from({ length: 30 }, generateSupplier)
