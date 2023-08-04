import { createEvent, createStore } from "effector";

export const setItemInCart = createEvent();
export const incItemAmount = createEvent();
export const decItemAmount = createEvent();

export const cartItems$ = createStore([])
  .on(setItemInCart, (store, newItem) => [...store, { ...newItem, amount: 1 }])
  .on(incItemAmount, (store, id) => {
    return store.map((el) => {
      if (el.id === id) {
        return { ...el, amount: el.amount + 1 };
      }
    });
  })
  .on(decItemAmount, (store, id) => {
    return store.map((el) => {
      if (el.id === id) {
        return { ...el, amount: el.amount - 1 };
      }
    });
  });

export const totalPrice$ = cartItems$.map((cartItems) => {
  return cartItems.reduce(
    (acc, item) => acc + Number(item.price * item.amount),
    0
  );
});
