import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, Ban , PackageCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Product } from '../data/schema'
import { useProducts } from './products-provider'

type Props<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({ table }: Props<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { setData } = useProducts()
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const count = selectedRows.length

  const selectedIds = new Set(
    selectedRows.map((r) => (r.original as Product).id)
  )

  const handleSetStock = (inStock: boolean) => {
    setData((prev) =>
      prev.map((p) =>
        selectedIds.has(p.id)
          ? { ...p, stock_quantity: inStock ? p.reorder_level + 1 : 0 }
          : p
      )
    )
    toast.success(
      `${count} product${count > 1 ? 's' : ''} marked as ${inStock ? 'In Stock' : 'Out of Stock'}.`
    )
    table.resetRowSelection()
  }

  const handleSetActive = (active: boolean) => {
    setData((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, active } : p))
    )
    toast.success(
      `${count} product${count > 1 ? 's' : ''} marked as ${active ? 'Active' : 'Inactive'}.`
    )
    table.resetRowSelection()
  }

  const handleDelete = () => {
    setData((prev) => prev.filter((p) => !selectedIds.has(p.id)))
    toast.success(`Deleted ${count} product${count > 1 ? 's' : ''}.`)
    table.resetRowSelection()
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='product'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='size-8'>
                  <PackageCheck />
                  <span className='sr-only'>Set stock status</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Set stock status</TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            <DropdownMenuItem onClick={() => handleSetStock(true)}>
              In Stock
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetStock(false)}>
              Out of Stock
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='size-8'>
                  <Ban  />
                  <span className='sr-only'>Set active status</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Set active status</TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            <DropdownMenuItem onClick={() => handleSetActive(true)}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetActive(false)}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              className='size-8'
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 />
              <span className='sr-only'>Delete selected products</span>
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
        title='Delete Products'
        desc={`Are you sure you want to delete ${count} product${count > 1 ? 's' : ''}? This cannot be undone.`}
        confirmText='Delete'
      />
    </>
  )
}
