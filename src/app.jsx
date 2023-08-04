import { useEffect, useState, useContext } from "react";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { Header } from "./header";
import { HomePage } from "./home";
import { CheckoutPage } from "./checkout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { CartPage } from "./header";

const setCartItems = createEvent();
const changeOne = createEvent();
const changeCounter = createEvent();

const cartItemsStore = createStore([])
  .on(setCartItems, (store, newStore) => {
    return newStore;
  })
  .on(changeOne, (store, id, newOne) => {
    return store.map((el) => {
      if (el.id === id) {
        return newOne;
      } else {
        return el;
      }
    });
  })
  .on(changeCounter, (store, id, newCount) => {
    return store.map((el) => {
      if (el.id === id) {
        el.counter = newCount;
        return el;
      } else {
        return el;
      }
    });
  });

function ProductPage({ product, cartItems, setCartItems }) {
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

export function App() {
  const cartItems = useStore(cartItemsStore);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          setError(res.error);
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  } else {
    let productRoutes = data.map((product) => {
      return (
        <Route
          path={"/" + product.id}
          element={
            <ProductPage
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      );
    });
    return (
      <>
        <Header cartItems={cartItems} setCartItems={setCartItems}></Header>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cartItems={cartItems}
                setCartItems={setCartItems}
                list={data}
                loading={loading}
              ></HomePage>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          {...productRoutes}
        </Routes>
      </>
    );
  }
}
