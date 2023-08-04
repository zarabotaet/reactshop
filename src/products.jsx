import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsFiltered$ } from "./model/products";
import { useUnit } from "effector-react";

function Product({ product, cartItems = [] }) {
  const [productCounter, setProductCounter] = useState(1);
  useEffect(() => {
    product.counter = productCounter;
  }, []);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={product.image} alt={product.title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {product.price}$
          </Text>
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
              if (cartItems.includes(product)) {
              } else {
                setCartItems((items) => [...items, product]);
              }
            }}
          >
            Add to cart
          </Button>
          <Link to={"/products/" + product.id}>
            <Button variant="ghost" colorScheme="blue">
              About Product
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export function Products() {
  const list = useUnit(productsFiltered$);

  if (list.length === 0) {
    return "No items for your filter";
  }

  return (
    <div className="main-products">
      {list.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}
