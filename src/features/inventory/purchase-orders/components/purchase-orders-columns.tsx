import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { poStatusStyles, poStatuses } from '../data/data'
import { type PurchaseOrder } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const purchaseOrdersColumns: ColumnDef<PurchaseOrder>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'po_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PO Number' />
    ),
    cell: ({ row }) => (
      <span className='font-mono font-medium'>{row.getValue('po_number')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'supplier_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Supplier' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('supplier_name')}</LongText>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const label = poStatuses.find((s) => s.value === status)?.label ?? status
      return (
        <Badge variant='outline' className={poStatusStyles[status as keyof typeof poStatusStyles]}>
          {label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order Date' />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue('order_date')
      return <span>{date.toLocaleDateString()}</span>
    },
  },
  {
    accessorKey: 'expected_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expected' />
    ),
    cell: ({ row }) => {
      const date: Date | undefined = row.getValue('expected_date')
      return <span className='text-muted-foreground'>{date ? date.toLocaleDateString() : '—'}</span>
    },
  },
  {
    accessorKey: 'total_amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const amount: number = row.getValue('total_amount')
      return (
        <span className='font-medium'>
          {amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
