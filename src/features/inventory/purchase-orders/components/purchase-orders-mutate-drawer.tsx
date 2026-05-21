import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { suppliers } from '@/features/crm/suppliers/data/suppliers'
import { poStatuses } from '../data/data'
import {
  type PurchaseOrder,
  type PurchaseOrderForm,
  purchaseOrderFormSchema,
} from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: PurchaseOrder
}

const supplierOptions = suppliers.map((s) => ({ label: s.name, value: s.id }))

function toDateInputValue(date?: Date) {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

export function PurchaseOrdersMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<PurchaseOrderForm>({
    resolver: zodResolver(purchaseOrderFormSchema) as Resolver<PurchaseOrderForm>,
    defaultValues: currentRow
      ? {
          po_number: currentRow.po_number,
          supplier_id: currentRow.supplier_id,
          supplier_name: currentRow.supplier_name,
          status: currentRow.status,
          order_date: toDateInputValue(currentRow.order_date),
          expected_date: toDateInputValue(currentRow.expected_date),
          total_amount: currentRow.total_amount,
          notes: currentRow.notes ?? '',
        }
      : {
          po_number: '',
          supplier_id: '',
          supplier_name: '',
          status: 'draft',
          order_date: toDateInputValue(new Date()),
          expected_date: '',
          total_amount: 0,
          notes: '',
        },
  })

  const onSubmit = (data: PurchaseOrderForm) => {
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? 'Update' : 'New'} Purchase Order</SheetTitle>
          <SheetDescription>
            {isUpdate ? 'Update the PO details below.' : 'Fill in the details for the new purchase order.'}
            {' '}Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='po-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-4 overflow-y-auto px-4 py-2'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='po_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PO Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='PO-00001' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select status'
                      items={poStatuses}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='supplier_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={(val) => {
                      field.onChange(val)
                      const supplier = suppliers.find((s) => s.id === val)
                      if (supplier) form.setValue('supplier_name', supplier.name)
                    }}
                    placeholder='Select supplier'
                    items={supplierOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='order_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl>
                      <Input {...field} type='date' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expected_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Date</FormLabel>
                    <FormControl>
                      <Input {...field} type='date' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='total_amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' min={0} step='0.01' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Optional notes' className='resize-none' rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button form='po-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
