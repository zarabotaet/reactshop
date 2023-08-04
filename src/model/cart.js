import { createEvent, createStore } from "effector";

export const addItemInCart = createEvent();
export const deleteItemInCart = createEvent();
export const incItemAmount = createEvent();
export const decItemAmount = createEvent();

export const cartItems$ = createStore({})
  .on(addItemInCart, (cartItems, newItem) => {
    cartItems = { ...cartItems };
    if (newItem.id in cartItems) {
      cartItems[newItem.id].amount++;
    } else {
      cartItems[newItem.id] = { ...newItem, amount: 1 };
    }

    return cartItems;
  })
  .on(deleteItemInCart, (cartItems, id) => {
    cartItems = { ...cartItems };
    delete cartItems[id];
    return cartItems;
  })
  .on(incItemAmount, (cartItems, id) => {
    cartItems = { ...cartItems };
    cartItems[id].amount++;
    return cartItems;
  })
  .on(decItemAmount, (cartItems, id) => {
    cartItems = { ...cartItems };
    if (cartItems[id].amount === 1) {
      delete cartItems[id];
    } else {
      cartItems[id].amount--;
    }
    return cartItems;
  });

export const cartItemsList$ = cartItems$.map(Object.values);
export const totalPrice$ = cartItems$.map((cartItems) => {
  return Object.values(cartItems).reduce(
    (acc, item) => acc + Number(item.price * item.amount),
    0
  );
});
