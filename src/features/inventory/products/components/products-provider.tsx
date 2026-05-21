import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { products as initialProducts } from '../data/products'
import { type Product } from '../data/schema'

type ProductsDialogType = 'add' | 'edit' | 'delete'

type ProductsContextType = {
  open: ProductsDialogType | null
  setOpen: (str: ProductsDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
  data: Product[]
  setData: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductsContext = React.createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ProductsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)
  const [data, setData] = useState<Product[]>(initialProducts)

  return (
    <ProductsContext value={{ open, setOpen, currentRow, setCurrentRow, data, setData }}>
      {children}
    </ProductsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const ctx = React.useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within <ProductsProvider>')
  return ctx
}
