import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Supplier } from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Supplier
}

export function SuppliersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = () => {
    onOpenChange(false)
    showSubmittedData(currentRow, 'The following supplier has been deleted:')
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
          Delete Supplier
        </span>
      }
      desc={
        <p>
          Are you sure you want to delete{' '}
          <span className='font-bold'>{currentRow.name}</span>?
          <br />
          This action cannot be undone.
        </p>
      }
      confirmText='Delete'
    />
  )
}
