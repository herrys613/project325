import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type PurchaseOrder } from '../data/schema'

type Props<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({ table }: Props<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const count = selectedRows.length

  const handleDelete = () => {
    const selected = selectedRows.map((r) => r.original as PurchaseOrder)
    toast.success(`Deleted ${selected.length} purchase order${selected.length > 1 ? 's' : ''}.`)
    table.resetRowSelection()
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='purchase order'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              className='size-8'
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 />
              <span className='sr-only'>Delete selected purchase orders</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete selected</TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        handleConfirm={handleDelete}
        destructive
        title='Delete Purchase Orders'
        desc={`Are you sure you want to delete ${count} purchase order${count > 1 ? 's' : ''}? This cannot be undone.`}
        confirmText='Delete'
      />
    </>
  )
}
