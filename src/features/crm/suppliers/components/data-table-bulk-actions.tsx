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
import { type Supplier } from '../data/schema'

type Props<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({ table }: Props<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const count = selectedRows.length

  const handleDelete = () => {
    const selected = selectedRows.map((r) => r.original as Supplier)
    toast.success(`Deleted ${selected.length} supplier${selected.length > 1 ? 's' : ''}.`)
    table.resetRowSelection()
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='supplier'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              className='size-8'
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 />
              <span className='sr-only'>Delete selected suppliers</span>
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
        title='Delete Suppliers'
        desc={`Are you sure you want to delete ${count} supplier${count > 1 ? 's' : ''}? This cannot be undone.`}
        confirmText='Delete'
      />
    </>
  )
}
