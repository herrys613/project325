import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SuppliersDialogs } from './components/suppliers-dialogs'
import { SuppliersPrimaryButtons } from './components/suppliers-primary-buttons'
import { SuppliersProvider } from './components/suppliers-provider'
import { SuppliersTable } from './components/suppliers-table'
import { suppliers } from './data/suppliers'

export function Suppliers() {
  return (
    <SuppliersProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Suppliers</h2>
            <p className='text-muted-foreground'>
              Manage your supplier directory.
            </p>
          </div>
          <SuppliersPrimaryButtons />
        </div>
        <SuppliersTable data={suppliers} />
      </Main>

      <SuppliersDialogs />
    </SuppliersProvider>
  )
}
