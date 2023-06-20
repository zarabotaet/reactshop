import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";
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
        <Td>{item.counter}</Td>
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
              <Th>quantity</Th>
            </Tr>
          </Thead>
          <Tbody>{items}</Tbody>
        </Table>
      </TableContainer>
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
