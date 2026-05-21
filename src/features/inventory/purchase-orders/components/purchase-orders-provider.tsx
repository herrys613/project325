import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type PurchaseOrder } from '../data/schema'

type PODialogType = 'add' | 'edit' | 'delete'

type POContextType = {
  open: PODialogType | null
  setOpen: (str: PODialogType | null) => void
  currentRow: PurchaseOrder | null
  setCurrentRow: React.Dispatch<React.SetStateAction<PurchaseOrder | null>>
}

const POContext = React.createContext<POContextType | null>(null)

export function PurchaseOrdersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<PODialogType>(null)
  const [currentRow, setCurrentRow] = useState<PurchaseOrder | null>(null)

  return (
    <POContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </POContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePurchaseOrders = () => {
  const ctx = React.useContext(POContext)
  if (!ctx) throw new Error('usePurchaseOrders must be used within <PurchaseOrdersProvider>')
  return ctx
}
