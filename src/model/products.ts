import { createEffect, restore } from 'effector'
import { Product } from './types'

export const getProductsFx = createEffect(() =>
  fetch('https://fakestoreapi.com/products').then((res) => res.json()),
)

export const $productsPending = getProductsFx.pending
export const $products = restore<Product[]>(getProductsFx, [])
export const $productsFiltered = restore<Product[]>(getProductsFx, [])
