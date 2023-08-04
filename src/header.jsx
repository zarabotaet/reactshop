import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  HStack,
} from "@chakra-ui/react";

export function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  function handleDelete(itemId) {
    const copy = cartItems.filter((el) => el.id !== itemId);
    setCartItems(copy);
  }

  function CartTableItem({ item }) {
    const [itemCounter, setItemCounter] = useState(item.counter);
    item.counter = itemCounter;
    return (
      <Tr>
        <Td>{item.title}</Td>
        <Td>{item.price}</Td>
        <Td>
          <HStack>
            <Button
              onClick={() => {
                if (itemCounter > 1) {
                  setItemCounter((num) => num - 1);
                }
              }}
            >
              -
            </Button>
            <h3>{itemCounter}</h3>
            <Button
              onClick={() => {
                if (itemCounter < 9) {
                  setItemCounter((num) => num + 1);
                }
              }}
            >
              +
            </Button>
          </HStack>
        </Td>
        <Td>
          <Button
            colorScheme="red"
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    );
  }

  let items = cartItems.map((item) => {
    return <CartTableItem item={item} key={item.id} />;
  });

  if (cartItems.length > 0) {
    return (
      <div className="cart-page">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>{items}</Tbody>
          </Table>
        </TableContainer>
        <Button onClick={() => navigate(-1)} colorScheme="blue">
          Back
        </Button>
        <Button colorScheme="purple">
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="cart-page">
        <h2>There are no items in the cart</h2>
        <Button onClick={() => navigate(-1)} colorScheme="red">
          Add items to cart
        </Button>
      </div>
    );
  }
}

function PreviewCartItem({ item, setCartItems, cartItems }) {
  const [productCounter, setProductCounter] = useState(item.counter);

  useEffect(() => {
    handleCounterChange(item.id, productCounter);
  }, [productCounter]);

  function handleCounterChange(itemId, newCounter) {
    const copy = cartItems.map((el) => {
      if (el.id === itemId) {
        el.counter = newCounter;
      }
      return el;
    });
    setCartItems(copy);
  }

  let title = item.title;
  if (title.length > 10) {
    title = title.slice(0, 10) + "...";
  }

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{item.price}</Td>
    </Tr>
  );
}

function Cart({ setCartOpen, cartItems, setCartItems }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calculatedTotal = 0;
    cartItems.forEach((el) => {
      calculatedTotal += Number(el.price * el.counter);
    });
    setTotal(calculatedTotal);
  }, [cartItems]);

  function handleCounterChange(itemId, newCounter) {
    const copy = cartItems.map((el) => {
      if (el.id === itemId) {
        el.counter = newCounter;
      }
      return el;
    });
    setCartItems(copy);
  }

  let items = cartItems.map((item) => {
    return (
      <PreviewCartItem
        item={item}
        key={item.id}
        setCartItems={setCartItems}
        cartItems={cartItems}
        handleCounterChange={handleCounterChange}
      />
    );
  });

  return (
    <div className="cart">
      <button
        onClick={() => {
          setCartOpen(false);
        }}
      >
        <img
          src="https://img.icons8.com/?size=512&id=46&format=png"
          alt=""
          className="cart__close-btn"
        />
      </button>
      <p>Total: {total}</p>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>{items}</Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setCartOpen(false)}>
        <Link to={"/cart"}>Full Cart</Link>
      </Button>
    </div>
  );
}

function CartBtn({ cartItems, setCartItems }) {
  const [cartOpen, setCartOpen] = useState(false);

  if (cartOpen) {
    return (
      <Cart
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    );
  } else {
    return (
      <button
        onClick={() => {
          if (cartItems.length >= 1) setCartOpen(true);
        }}
        className="cart__close-btn"
      >
        {cartItems.length > 0 ? (
          <div className="cart-num">{cartItems.length}</div>
        ) : (
          false
        )}
        <img src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="" />
      </button>
    );
  }
}

export function Header({ cartItems, setCartItems }) {
  return (
    <header className="header">
      <div className="cart-container">
        <CartBtn cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </header>
  );
}
