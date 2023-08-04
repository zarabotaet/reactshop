import {
  HStack,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function PriceFilter({ list, setListFilter, setMinPrice, setMaxPrice }) {
  const [minPrice, setMinPriceLocal] = useState(0);
  const [maxPrice, setMaxPriceLocal] = useState(1000);

  useEffect(() => {
    let copy = [...list];
    if (minPrice !== "" && maxPrice !== "") {
      copy = copy.filter((el) => el.price >= minPrice && el.price <= maxPrice);
    }
    setListFilter(copy);
  }, [minPrice, maxPrice, setListFilter]);

  const handleFilter = (e) => {
    e.preventDefault();
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  return (
    <form action="#" onSubmit={handleFilter}>
      <div>
        <HStack>
          <NumberInput
            value={minPrice}
            onChange={(value) => setMinPriceLocal(value)}
            placeholder="min"
          >
            <NumberInputField />
          </NumberInput>

          <NumberInput
            value={maxPrice}
            onChange={(value) => setMaxPriceLocal(value)}
            placeholder="max"
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
      </div>
    </form>
  );
}

function Sorter({ list, setListFilter }) {
  const [sorterValue, setSorterValue] = useState("recent");

  useEffect(() => {
    let copy = [...list];
    if (sorterValue === "recent") {
      copy.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (sorterValue === "low") {
      copy.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sorterValue === "high") {
      copy.sort((a, b) => {
        return b.price - a.price;
      });
    }
    setListFilter(copy);
  }, [sorterValue, setListFilter]);

  return (
    <Select
      placeholder="Select option"
      value={sorterValue}
      onChange={(e) => {
        setSorterValue(e.target.value);
      }}
    >
      <option value="recent">Featured</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </Select>
  );
}

export function Sidebar({ list, setListFilter, setMinPrice, setMaxPrice }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let copy = [...list];
    if (selectedCategory !== "") {
      copy = copy.filter((product) => product.category === selectedCategory);
    }
    setListFilter(copy);
  }, [selectedCategory, setListFilter]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setMinPrice("");
    setMaxPrice("");
  };

  let types = [...new Set(list.map((el) => el.category))];
  let domTypes = types.map((type) => {
    return (
      <ListItem key={type}>
        <button onClick={() => handleCategoryFilter(type)}>
          {type.toUpperCase()}
        </button>
      </ListItem>
    );
  });

  return (
    <List spacing={3}>
      <ListItem key={"all"}>
        <button onClick={() => handleCategoryFilter("")}>ALL</button>
      </ListItem>
      {domTypes}
      <ListItem>
        <Sorter list={list} setListFilter={setListFilter} />
      </ListItem>
      <ListItem>
        <PriceFilter
          list={list}
          setListFilter={setListFilter}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </ListItem>
    </List>
  );
}
