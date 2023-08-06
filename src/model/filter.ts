import { createEvent, restore, sample } from 'effector'
import { $products, $productsFiltered } from './products'

export enum FilterKeys {
  RECENT = 'recent',
  LOW = 'low',
  HIGH = 'high',
}

export const setSorterValue = createEvent<FilterKeys>()
export const $sorterValue = restore(setSorterValue, FilterKeys.RECENT)

sample({
  clock: setSorterValue,
  source: $productsFiltered,
  fn: (products, sorterValue) => {
    const productsCopy = [...products]
    switch (sorterValue) {
      case FilterKeys.RECENT:
        productsCopy.sort((a, b) => a.id - b.id)
        break
      case FilterKeys.LOW:
        productsCopy.sort((a, b) => a.price - b.price)
        break
      case FilterKeys.HIGH:
        productsCopy.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    return productsCopy
  },
  target: $productsFiltered,
})

export const setMinPrice = createEvent<string>()
export const $minPrices = restore(setMinPrice, '0')

export const setMaxPrice = createEvent<string>()
export const $maxPrices = restore(setMaxPrice, '1000')

export const $categories = $products.map((products) => [
  ...new Set(products.map((el) => el.category)),
])
export const setSelectedCategory = createEvent<string>()
export const $selectedCategory = restore(setSelectedCategory, '')

sample({
  clock: [setMinPrice, setMaxPrice, setSelectedCategory],
  source: [$products, $minPrices, $maxPrices, $selectedCategory] as const,
  fn: ([products, minPrice, maxPrice, selectedCategory]) => {
    let productsFiltered = products
    if (selectedCategory !== '') {
      productsFiltered = products.filter(
        (product) => product.category === selectedCategory,
      )
    }
    return productsFiltered.filter(
      (el) => el.price >= Number(minPrice) && el.price <= Number(maxPrice),
    )
  },
  target: $productsFiltered,
})
