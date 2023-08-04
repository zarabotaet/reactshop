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
import { useUnit } from "effector-react";
import { cartItems$, cartItemsList$, totalPrice$ } from "./model/cart";

function PreviewCartItem({ title, price, amount }) {
  if (title.length > 10) {
    title = title.slice(0, 10) + "...";
  }

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>{amount}</Td>
    </Tr>
  );
}

function Cart({ closeCartPreview }) {
  const [cartItems, totalPrice] = useUnit([cartItemsList$, totalPrice$]);

  let items = cartItems.map((item) => {
    return <PreviewCartItem {...item} key={item.id} />;
  });

  return (
    <div className="cart">
      <button onClick={closeCartPreview}>
        <img
          src="https://img.icons8.com/?size=512&id=46&format=png"
          alt=""
          className="cart__close-btn"
        />
      </button>
      <p>Total: {totalPrice}</p>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>{items}</Tbody>
        </Table>
      </TableContainer>
      <Button onClick={closeCartPreview}>
        <Link to={"/cart"}>Full Cart</Link>
      </Button>
    </div>
  );
}

function CartBtn() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemsList = useUnit(cartItemsList$);

  if (cartOpen) {
    return (
      <Cart
        closeCartPreview={() => {
          setCartOpen(false);
        }}
      />
    );
  } else {
    return (
      <button
        onClick={() => {
          if (cartItemsList.length > 0) setCartOpen(true);
        }}
        className="cart__close-btn"
      >
        {cartItemsList.length > 0 ? (
          <div className="cart-num">{cartItemsList.length}</div>
        ) : (
          false
        )}
        <img src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="" />
      </button>
    );
  }
}

export function Header() {
  return (
    <header className="header">
      <div className="cart-container">
        <CartBtn />
      </div>
    </header>
  );
}
