import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const getProductsFx = createEffect(() =>
  fetch("https://fakestoreapi.com/products").then((res) => res.json())
);

export const productsPending$ = getProductsFx.pending;
export const products$ = restore(getProductsFx, []);
export const productsFiltered$ = restore(getProductsFx, []);
