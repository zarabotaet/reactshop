import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  HStack,
  Button,
  ButtonGroup,
  Heading,
  Divider,
  Image,
  ListItem,
  List,
  VStack,
  Select,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function PriceFilter({ list, setListFilter }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    let copy = [...list];
    if (minPrice !== "" && maxPrice !== "") {
      copy = copy.filter((el) => el.price >= minPrice && el.price <= maxPrice);
    }
    setListFilter(copy);
  }, [minPrice, maxPrice, setListFilter]);

  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        setMinPrice(min);
        setMaxPrice(max);
      }}
    >
      <div>
        <HStack>
          <NumberInput
            value={minPrice}
            onChange={(value) => setMinPrice(value)}
            placeholder="min"
          >
            <NumberInputField />
          </NumberInput>

          <NumberInput
            value={maxPrice}
            onChange={(value) => setMaxPrice(value)}
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

function Sidebar({
  list,
  listFilter,
  setListFilter,
  setMinPrice,
  setMaxPrice,
}) {
  let types = [...new Set(list.map((el) => el.category))];

  let domTypes = types.map((type) => {
    return (
      <ListItem key={type}>
        <button
          onClick={() => {
            const filteredList = list.filter(
              (product) => product.category === type
            );
            setListFilter(filteredList);
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          {type.toUpperCase()}
        </button>
      </ListItem>
    );
  });

  return (
    <List spacing={3}>
      <ListItem key={"all"}>
        <button
          onClick={() => {
            setListFilter(list);
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          ALL
        </button>
      </ListItem>
      {domTypes}
      <ListItem>
        <Sorter list={listFilter} setListFilter={setListFilter} />
      </ListItem>
      <ListItem>
        <PriceFilter list={list} setListFilter={setListFilter} />
      </ListItem>
    </List>
  );
}

function Product({ product, cartItems, setCartItems }) {
  const [productCounter, setProductCounter] = useState(1);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={product.image} alt={product.title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {product.price}$
          </Text>
          <HStack>
            <Button
              onClick={() => {
                if (productCounter > 1) {
                  setProductCounter((num) => num - 1);
                }
              }}
            >
              -
            </Button>
            <h3>{productCounter}</h3>
            <Button
              onClick={() => {
                if (productCounter < 9) {
                  setProductCounter((num) => num + 1);
                }
              }}
            >
              +
            </Button>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              product.counter = productCounter;
              setProductCounter(1);
              setCartItems((items) => [...items, product]);
            }}
          >
            Add to cart
          </Button>
          <Link to={"/" + product.id}>
            <Button variant="ghost" colorScheme="blue">
              About Product
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

function Products({ list, cartItems, setCartItems }) {
  let products = list.map((product) => {
    return (
      <Product
        key={product.id}
        product={product}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    );
  });
  return <div className="main-products">{products}</div>;
}

export default function HomePage({ list, cartItems, setCartItems }) {
  const [listFilter, setListFilter] = useState(list);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let copy = [...list];
    if (minPrice !== "" && maxPrice !== "") {
      copy = copy.filter((el) => el.price >= minPrice && el.price <= maxPrice);
    }
    setListFilter(copy);
  }, [minPrice, maxPrice]);

  return (
    <div className="main">
      <Sidebar
        list={list}
        listFilter={listFilter}
        setListFilter={setListFilter}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <Products
        list={listFilter}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
}
