import { createEvent, createStore } from 'effector'
import { Product } from './types'

export const addItemInCart = createEvent<Product>()
export const deleteItemInCart = createEvent<string>()
export const incItemAmount = createEvent<string>()
export const decItemAmount = createEvent<string>()

type CartItems = {
  [key: string]: Product & { amount: number }
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
