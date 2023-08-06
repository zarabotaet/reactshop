import { createEvent, createStore } from 'effector'

export const addItemInCart = createEvent()
export const deleteItemInCart = createEvent()
export const incItemAmount = createEvent()
export const decItemAmount = createEvent()

export const $cartItems = createStore({})
  .on(addItemInCart, (cartItems, newItem) => {
    const cartItemsCopy = { ...cartItems }
    if (newItem.id in cartItems) {
      cartItems[newItem.id].amount++
    } else {
      cartItems[newItem.id] = { ...newItem, amount: 1 }
    }

    return cartItemsCopy
  })
  .on(deleteItemInCart, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    delete cartItems[id]
    return cartItemsCopy
  })
  .on(incItemAmount, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    cartItems[id].amount++
    return cartItemsCopy
  })
  .on(decItemAmount, (cartItems, id) => {
    const cartItemsCopy = { ...cartItems }
    if (cartItems[id].amount === 1) {
      delete cartItems[id]
    } else {
      cartItems[id].amount--
    }
    return cartItemsCopy
  })

export const $cartItemsList = $cartItems.map(Object.values)
export const $totalPrice = $cartItems.map((cartItems) => {
  return Object.values(cartItems).reduce(
    (acc, item) => acc + Number(item.price * item.amount),
    0,
  )
})
