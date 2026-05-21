import { PackagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProducts } from './products-provider'

export function ProductsPrimaryButtons() {
  const { setOpen } = useProducts()
  return (
    <Button className='space-x-1' onClick={() => setOpen('add')}>
      <span>Add Product</span> <PackagePlus size={18} />
    </Button>
  )
}
