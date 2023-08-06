import { createEffect, restore } from 'effector'
import { ProductT } from './types'

export const getProductsFx = createEffect(() =>
  fetch('https://fakestoreapi.com/products').then((res) => res.json()),
)

export const $productsPending = getProductsFx.pending
export const $products = restore<ProductT[]>(getProductsFx, [])
export const $productsFiltered = restore<ProductT[]>(getProductsFx, [])
