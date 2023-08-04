import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { Route, useNavigate, useParams } from "react-router-dom";
import { products$ } from "../model/products";
import { addItemInCart } from "../model/cart";

export function ProductCard() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const products = useUnit(products$);
  const product = products.find(({ id }) => id === Number(productId));

  return (
    <Flex className="product-page">
      <div className="product-page__left">
        <img src={product.image} alt={product.title} />
      </div>
      <Spacer />
      <div className="product-page__right">
        <Heading>{product.title}</Heading>
        <h3>{product.price}$</h3>
        <Text fontSize="xl">{product.description}</Text>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => addItemInCart(product)}
        >
          Add to cart
        </Button>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </Flex>
  );
}
