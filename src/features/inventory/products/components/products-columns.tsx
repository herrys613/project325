import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import {
  categories,
  getStockStatus,
  stockStatusLabels,
  stockStatusStyles,
} from '../data/data'
import { type Product } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const productsColumns: ColumnDef<Product>[] = [
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
    meta: {
      className: cn('inset-s-0 z-10 rounded-tl-[inherit] max-md:sticky'),
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs'>{row.getValue('sku')}</span>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'inset-s-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('name')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      const cat = categories.find((c) => c.value === row.getValue('category'))
      return <span>{cat?.label ?? row.getValue('category')}</span>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'stock_quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => {
      const stock: number = row.getValue('stock_quantity')
      const reorder: number = row.original.reorder_level
      const status = getStockStatus(stock, reorder)
      return (
        <span
          className={cn(
            'font-medium',
            status === 'out_of_stock' && 'text-destructive',
            status === 'low_stock' && 'text-yellow-600 dark:text-yellow-400'
          )}
        >
          {stock}
        </span>
      )
    },
  },
  {
    accessorKey: 'unit_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit Price' />
    ),
    cell: ({ row }) => {
      const price: number = row.getValue('unit_price')
      return (
        <span>
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      )
    },
  },
  {
    id: 'stock_status',
    accessorFn: (row) => getStockStatus(row.stock_quantity, row.reorder_level),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = getStockStatus(
        row.original.stock_quantity,
        row.original.reorder_level
      )
      const badgeClass = stockStatusStyles.get(status)
      return (
        <Badge variant='outline' className={cn('whitespace-nowrap', badgeClass)}>
          {stockStatusLabels[status]}
        </Badge>
      )
    },
    filterFn: (row, _id, value: string[]) => {
      const status = getStockStatus(
        row.original.stock_quantity,
        row.original.reorder_level
      )
      return value.includes(status)
    },
    enableSorting: false,
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Active' />
    ),
    cell: ({ row }) => {
      const active: boolean = row.getValue('active')
      return (
        <Badge
          variant='outline'
          className={
            active
              ? 'border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200'
              : 'border-neutral-300 bg-neutral-300/40'
          }
        >
          {active ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(String(row.getValue(id))),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
