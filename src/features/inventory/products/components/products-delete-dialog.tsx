import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Product } from '../data/schema'
import { useProducts } from './products-provider'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Product
}

export function ProductsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { setData } = useProducts()

  const handleDelete = () => {
    setData((prev) => prev.filter((p) => p.id !== currentRow.id))
    onOpenChange(false)
    toast.success(`Product "${currentRow.name}" deleted.`)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      destructive
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Product
        </span>
      }
      desc={
        <p>
          Are you sure you want to delete{' '}
          <span className='font-bold'>{currentRow.name}</span> (SKU:{' '}
          <span className='font-mono font-bold'>{currentRow.sku}</span>)?
          <br />
          This action cannot be undone.
        </p>
      }
      confirmText='Delete'
    />
  )
}
