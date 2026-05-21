import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePurchaseOrders } from './purchase-orders-provider'

export function PurchaseOrdersPrimaryButtons() {
  const { setOpen } = usePurchaseOrders()
  return (
    <Button className='space-x-1' onClick={() => setOpen('add')}>
      <span>New Purchase Order</span> <ShoppingCart size={18} />
    </Button>
  )
}
