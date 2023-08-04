import { createEvent, createStore } from "effector";

export const setCartItems = createEvent();
export const changeOne = createEvent();
export const changeCounter = createEvent();

export const cartItemsStore = createStore([])
  .on(setCartItems, (store, newStore) => {
    return newStore;
  })
  .on(changeOne, (store, id, newOne) => {
    return store.map((el) => {
      if (el.id === id) {
        return newOne;
      } else {
        return el;
      }
    });
  })
  .on(changeCounter, (store, id, newCount) => {
    return store.map((el) => {
      if (el.id === id) {
        el.counter = newCount;
        return el;
      } else {
        return el;
      }
    });
  });
