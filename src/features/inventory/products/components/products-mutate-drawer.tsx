import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { categories } from '../data/data'
import { type Product, type ProductForm, productFormSchema } from '../data/schema'
import { useProducts } from './products-provider'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Product
}

export function ProductsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const { setData } = useProducts()

  const form = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductForm>,
    defaultValues: currentRow
      ? {
          sku: currentRow.sku,
          barcode: currentRow.barcode ?? '',
          name: currentRow.name,
          description: currentRow.description ?? '',
          category: currentRow.category,
          unit_price: currentRow.unit_price,
          cost_price: currentRow.cost_price,
          stock_quantity: currentRow.stock_quantity,
          reorder_level: currentRow.reorder_level,
          active: currentRow.active,
        }
      : {
          sku: '',
          barcode: '',
          name: '',
          description: '',
          category: '',
          unit_price: 0,
          cost_price: 0,
          stock_quantity: 0,
          reorder_level: 10,
          active: true,
        },
  })

  const onSubmit = (formData: ProductForm) => {
    if (isUpdate && currentRow) {
      setData((prev) =>
        prev.map((p) =>
          p.id === currentRow.id
            ? { ...p, ...formData, updated_at: new Date() }
            : p
        )
      )
      toast.success('Product updated.')
    } else {
      const now = new Date()
      setData((prev) => [
        ...prev,
        {
          ...formData,
          id: crypto.randomUUID(),
          barcode: formData.barcode ?? undefined,
          description: formData.description ?? undefined,
          created_at: now,
          updated_at: now,
        },
      ])
      toast.success('Product added.')
    }
    onOpenChange(false)
    form.reset()
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
          <SheetTitle>{isUpdate ? 'Update' : 'Add'} Product</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update product details below.'
              : 'Fill in the details to add a new product.'}
            {' '}Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='products-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-4 overflow-y-auto px-4 py-2'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='sku'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='e.g. ABC12345' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='barcode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Optional' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter product name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Optional description'
                      className='resize-none'
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select a category'
                    items={categories}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='cost_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Price ($)</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} step='0.01' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='unit_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price ($)</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} step='0.01' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='stock_quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Qty</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} step={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='reorder_level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reorder Level</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' min={0} step={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='active'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between rounded-lg border p-3'>
                  <FormLabel className='cursor-pointer'>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button form='products-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
