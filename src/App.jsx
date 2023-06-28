import { useEffect, useState } from "react";
import Header from "./header";
import HomePage from "./home";
import CheckoutPage from "./checkout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { CartPage } from "./header";
function ProductPage({ title, description, price, img }) {
  const navigate = useNavigate();
  return (
    <Flex className="product-page">
      <div className="product-page__left">
        <img src={img} alt={title} />
      </div>
      <Spacer />
      <div className="product-page__right">
        <Heading>{title}</Heading>
        <h3>{price}$</h3>
        <Text fontSize="xl">{description}</Text>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </Flex>
  );
}
function App() {
  const [cartItems, setCartItems] = useState([]);
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
              title={product.title}
              description={product.description}
              price={product.price}
              img={product.image}
            />
          }
        />
      );
    });
    return (
      <>
        <Header cartItems={cartItems}></Header>
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

export default App;
