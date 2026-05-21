import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PurchaseOrdersDialogs } from './components/purchase-orders-dialogs'
import { PurchaseOrdersPrimaryButtons } from './components/purchase-orders-primary-buttons'
import { PurchaseOrdersProvider } from './components/purchase-orders-provider'
import { PurchaseOrdersTable } from './components/purchase-orders-table'
import { purchaseOrders } from './data/purchase-orders'

export function PurchaseOrders() {
  return (
    <PurchaseOrdersProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Purchase Orders</h2>
            <p className='text-muted-foreground'>
              Track orders placed with your suppliers.
            </p>
          </div>
          <PurchaseOrdersPrimaryButtons />
        </div>
        <PurchaseOrdersTable data={purchaseOrders} />
      </Main>

      <PurchaseOrdersDialogs />
    </PurchaseOrdersProvider>
  )
}
