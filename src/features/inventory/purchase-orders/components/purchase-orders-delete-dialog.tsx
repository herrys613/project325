import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type PurchaseOrder } from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: PurchaseOrder
}

export function PurchaseOrdersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = () => {
    onOpenChange(false)
    showSubmittedData(currentRow, 'The following purchase order has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      destructive
      title={
        <span className='text-destructive'>
          <AlertTriangle className='me-1 inline-block stroke-destructive' size={18} />{' '}
          Delete Purchase Order
        </span>
      }
      desc={
        <p>
          Are you sure you want to delete{' '}
          <span className='font-mono font-bold'>{currentRow.po_number}</span>?
          <br />
          This action cannot be undone.
        </p>
      }
      confirmText='Delete'
    />
  )
}
