import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
    const copy = [...cartItems].filter((el) => el.id !== itemId);
    setCartItems(copy);
  }
  function CartTableItem({ item }) {
    const [itemCounter, setItemCounter] = useState(item.counter);
    item.counter = itemCounter;
    // Нужно будет дорабатывать так, чтобы в итоге массив изменялся когда меняешь количество, например при покупке
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
            {" "}
            Delete
          </Button>
        </Td>
      </Tr>
    );
  }
  let items = [...cartItems].map((item) => {
    return (
      <CartTableItem item={item} />
      // // <li>
      // //   {title} - {item.price}$ * {item.counter}
      // // </li>
      // <Tr>
      //   <Td>{item.title}</Td>
      //   <Td>{item.price}</Td>
      //   <Td>
      //     <HStack>
      //       <Button
      //         onClick={() => {
      //           if (item.counter > 1) {
      //             item.counter = item.counter - 1;
      //           }
      //         }}
      //       >
      //         -
      //       </Button>
      //       <h3>{item.counter}</h3>
      //       <Button
      //         onClick={() => {
      //           if (item.counter < 9) {
      //             item.counter = item.counter + 1;
      //           }
      //         }}
      //       >
      //         +
      //       </Button>
      //     </HStack>
      //   </Td>
      //   <Td>
      //     <Button
      //       onClick={() => {
      //         handleDelete(item.id);
      //       }}
      //     >
      //       {" "}
      //       Delete
      //     </Button>
      //   </Td>
      // </Tr>
    );
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
                <Th>quantity</Th>
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
        <h2>There is no cart items</h2>
        <Button onClick={() => navigate(-1)} colorScheme="red">
          Get something to cart
        </Button>
      </div>
    );
  }
}

function Cart({ setCartOpen, cartItems }) {
  let items = [...cartItems].map((item) => {
    let title = item.title;
    if (title.length > 10) {
      title = title.slice(0, 10) + "...";
    }
    return (
      // <li>
      //   {title} - {item.price}$ * {item.counter}
      // </li>
      <Tr>
        <Td>{title}</Td>
        <Td>{item.price}</Td>
      </Tr>
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
function CartBtn({ cartItems }) {
  const [cartOpen, setCartOpen] = useState(false);
  if (cartOpen) {
    return <Cart setCartOpen={setCartOpen} cartItems={cartItems} />;
  } else {
    return (
      <button
        onClick={() => {
          if (cartItems.length >= 1) setCartOpen(true);
        }}
        className="cart__close-btn"
      >
        <img src="https://img.icons8.com/?size=512&id=9671&format=png" alt="" />
      </button>
    );
  }
}

export default function Header({ cartItems }) {
  let total = 0;
  cartItems.forEach((el) => {
    console.log(el);
    total += Number(el.price * el.counter);
  });
  return (
    <header className="header">
      <div className="cart-container">
        {" "}
        <CartBtn cartItems={cartItems} />
      </div>
      <p>Total: {total}$</p>
    </header>
  );
}
