import { createEvent, restore, sample } from "effector";
import { getProductsFx, products$, productsFiltered$ } from "./products";

export const RECENT = "recent";
export const LOW = "low";
export const HIGH = "high";

export const setSorterValue = createEvent();
export const sorterValue$ = restore(setSorterValue, RECENT);

sample({
  clock: setSorterValue,
  source: productsFiltered$,
  fn: (products, sorterValue) => {
    const productsCopy = [...products];
    switch (sorterValue) {
      case RECENT:
        productsCopy.sort((a, b) => a.id - b.id);
        break;
      case LOW:
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case HIGH:
        productsCopy.sort((a, b) => b.price - a.price);
        break;
    }
    return productsCopy;
  },
  target: productsFiltered$,
});

export const setMinPrice = createEvent();
export const minPrices$ = restore(setMinPrice, 0);

export const setMaxPrice = createEvent();
export const maxPrices$ = restore(setMaxPrice, 1000);

export const categories$ = products$.map((products) => [
  ...new Set(products.map((el) => el.category)),
]);
export const setSelectedCategory = createEvent();
export const selectedCategory$ = restore(setSelectedCategory, "");

sample({
  clock: [setMinPrice, setMaxPrice, setSelectedCategory],
  source: [products$, minPrices$, maxPrices$, selectedCategory$],
  fn: ([products, minPrice, maxPrice, selectedCategory]) => {
    let productsFiltered = products;
    if (selectedCategory !== "") {
      productsFiltered = products.filter(
        (product) => product.category === selectedCategory
      );
    }
    return productsFiltered.filter(
      (el) => el.price >= minPrice && el.price <= maxPrice
    );
  },
  target: productsFiltered$,
});
