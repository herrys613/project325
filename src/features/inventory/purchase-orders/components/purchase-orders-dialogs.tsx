import { PurchaseOrdersMutateDrawer } from './purchase-orders-mutate-drawer'
import { PurchaseOrdersDeleteDialog } from './purchase-orders-delete-dialog'
import { usePurchaseOrders } from './purchase-orders-provider'

export function PurchaseOrdersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePurchaseOrders()

  return (
    <>
      <PurchaseOrdersMutateDrawer
        key='po-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <PurchaseOrdersMutateDrawer
            key={`po-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <PurchaseOrdersDeleteDialog
            key={`po-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
