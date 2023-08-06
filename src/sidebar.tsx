import {
  HStack,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import {
  $categories,
  $maxPrices,
  $minPrices,
  $sorterValue,
  FilterKeys,
  setMaxPrice,
  setMinPrice,
  setSelectedCategory,
  setSorterValue,
} from './model/filter'

function PriceFilter() {
  const [minPrice, maxPrice] = useUnit([$minPrices, $maxPrices])

  return (
    <ListItem>
      <form action="#" onSubmit={() => {}}>
        <div>
          <HStack>
            <NumberInput
              value={minPrice}
              onChange={setMinPrice}
              placeholder="min"
            >
              <NumberInputField />
            </NumberInput>

            <NumberInput
              value={maxPrice}
              onChange={setMaxPrice}
              placeholder="max"
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        </div>
      </form>
    </ListItem>
  )
}

function Sorter() {
  const sorterValue = useUnit($sorterValue)

  return (
    <ListItem>
      <Select
        value={sorterValue}
        onChange={(e) => {
          setSorterValue(e.target.value as FilterKeys)
        }}
      >
        <option value={FilterKeys.RECENT}>Featured</option>
        <option value={FilterKeys.LOW}>Price: Low to High</option>
        <option value={FilterKeys.HIGH}>Price: High to Low</option>
      </Select>
    </ListItem>
  )
}

function Categories() {
  const [categories] = useUnit([$categories])

  return (
    <>
      <ListItem>
        <button onClick={() => setSelectedCategory('')}>ALL</button>
      </ListItem>
      {categories.map((category) => {
        return (
          <ListItem key={category}>
            <button onClick={() => setSelectedCategory(category)}>
              {category.toUpperCase()}
            </button>
          </ListItem>
        )
      })}
    </>
  )
}

export function Sidebar() {
  return (
    <List spacing={3}>
      <Categories />
      <Sorter />
      <PriceFilter />
    </List>
  )
}
