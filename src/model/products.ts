import { createEffect, restore } from 'effector'

interface Product {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: { rate: number; count: number }
  count: number
  rate: number
  title: string
}

export const getProductsFx = createEffect(() =>
  fetch('https://fakestoreapi.com/products').then((res) => res.json()),
)

getProductsFx.doneData

export const $productsPending = getProductsFx.pending
export const $products = restore<Product[]>(getProductsFx, [])
export const $productsFiltered = restore<Product[]>(getProductsFx, [])
