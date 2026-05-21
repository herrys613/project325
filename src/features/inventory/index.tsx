import { AlertTriangle, DollarSign, Package, PackageX } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStockStatus } from './products/data/data'
import { products } from './products/data/products'

function getStats() {
  const active = products.filter((p) => p.active)
  const lowStock = active.filter(
    (p) => getStockStatus(p.stock_quantity, p.reorder_level) === 'low_stock'
  )
  const outOfStock = active.filter(
    (p) => getStockStatus(p.stock_quantity, p.reorder_level) === 'out_of_stock'
  )
  const inventoryValue = active.reduce(
    (sum, p) => sum + p.cost_price * p.stock_quantity,
    0
  )
  return {
    total: active.length,
    lowStock: lowStock.length,
    outOfStock: outOfStock.length,
    inventoryValue,
  }
}

const stats = getStats()

const statCards = [
  {
    title: 'Total Products',
    value: stats.total,
    icon: Package,
    description: 'Active products in catalogue',
  },
  {
    title: 'Low Stock',
    value: stats.lowStock,
    icon: AlertTriangle,
    description: 'Products below reorder level',
    highlight: stats.lowStock > 0 ? 'text-yellow-600 dark:text-yellow-400' : '',
  },
  {
    title: 'Out of Stock',
    value: stats.outOfStock,
    icon: PackageX,
    description: 'Products with zero stock',
    highlight: stats.outOfStock > 0 ? 'text-destructive' : '',
  },
  {
    title: 'Inventory Value',
    value: stats.inventoryValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }),
    icon: DollarSign,
    description: 'Total cost value of stock on hand',
  },
]

export function Inventory() {
  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Inventory Dashboard
          </h2>
          <p className='text-muted-foreground'>
            Overview of your stock and product health.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {statCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {card.title}
                </CardTitle>
                <card.icon className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${card.highlight ?? ''}`}
                >
                  {card.value}
                </div>
                <p className='text-muted-foreground text-xs'>
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}
