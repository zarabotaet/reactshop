import {
  HStack,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { products$ } from "./model/products";
import {
  HIGH,
  LOW,
  RECENT,
  categories$,
  maxPrices$,
  minPrices$,
  setMaxPrice,
  setMinPrice,
  setSelectedCategory,
  setSorterValue,
  sorterValue$,
} from "./model/filter";

function PriceFilter() {
  const [minPrice, maxPrice] = useUnit([minPrices$, maxPrices$]);

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
  );
}

function Sorter() {
  const sorterValue = useUnit(sorterValue$);

  return (
    <ListItem>
      <Select
        value={sorterValue}
        onChange={(e) => {
          setSorterValue(e.target.value);
        }}
      >
        <option value={RECENT}>Featured</option>
        <option value={LOW}>Price: Low to High</option>
        <option value={HIGH}>Price: High to Low</option>
      </Select>
    </ListItem>
  );
}

function Categories() {
  const [categories] = useUnit([categories$]);

  return (
    <>
      <ListItem>
        <button onClick={() => setSelectedCategory("")}>ALL</button>
      </ListItem>
      {categories.map((category) => {
        return (
          <ListItem key={category}>
            <button onClick={() => setSelectedCategory(category)}>
              {category.toUpperCase()}
            </button>
          </ListItem>
        );
      })}
    </>
  );
}

export function Sidebar() {
  return (
    <List spacing={3}>
      <Categories />
      <Sorter />
      <PriceFilter />
    </List>
  );
}
