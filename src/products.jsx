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
import { addItemInCart } from "./model/cart";

function Product({ product }) {
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
            onClick={() => addItemInCart(product)}
          >
            Add to cart
          </Button>
          <Link to={"/product/" + product.id}>
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
  const products = useUnit(productsFiltered$);

  if (products.length === 0) {
    return "No items for your filter";
  }

  return (
    <div className="main-products">
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}
