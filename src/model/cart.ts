import { createEvent, createStore } from 'effector'
import { ProductT } from './types'

export const addItemInCart = createEvent<ProductT>()
export const deleteItemInCart = createEvent<number>()
export const incItemAmount = createEvent<number>()
export const decItemAmount = createEvent<number>()

export type CartItemT = ProductT & { amount: number }

type CartItems = {
  [key: string]: CartItemT
}

export const $cartItems = createStore<CartItems>({})
  .on(addItemInCart, (cartItems, newItem) => {
    const cartItemsCopy = { ...cartItems }
    if (newItem.id in cartItemsCopy) {
      cartItemsCopy[newItem.id].amount++
    } else {
      cartItemsCopy[newItem.id] = { ...newItem, amount: 1 }
    }

    return cartItemsCopy
  })
  .on(deleteItemInCart, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    delete cartItemsCopy[id]
    return cartItemsCopy
  })
  .on(incItemAmount, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    cartItemsCopy[id].amount++
    return cartItemsCopy
  })
  .on(decItemAmount, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    if (cartItemsCopy[id].amount === 1) {
      delete cartItemsCopy[id]
    } else {
      cartItemsCopy[id].amount--
    }
    return cartItemsCopy
  })

export const $cartItemsList = $cartItems.map((items) => Object.values(items))
export const $totalPrice = $cartItems.map((cartItems) => {
  return Object.values(cartItems).reduce(
    (acc, item) => acc + Number(item.price * item.amount),
    0,
  )
})
