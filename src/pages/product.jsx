import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Route, useNavigate } from "react-router-dom";

export function ProductCard({ productId }) {
  const navigate = useNavigate();
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
          onClick={() => {
            if (cartItems.includes(product)) {
            } else {
              setCartItems((items) => [...items, product]);
            }
          }}
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
