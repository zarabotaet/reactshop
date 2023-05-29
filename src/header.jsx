import { useState } from "react";

function Cart({ setCartOpen, cartItems }) {
  let items = [...cartItems].map((item) => {
    let title = item.title;
    if (title.length > 10) {
      title = title.slice(0, 10) + "...";
    }
    return (
      <li>
        {title} - {item.price}$
      </li>
    );
  });
  return (
    <div className="cart">
      <button
        onClick={() => {
          setCartOpen(false);
        }}
      >
        <img src="src/assets/close.png" alt="" className="cart__close-btn" />
      </button>
      <ul>{items}</ul>
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
        <img src="/src/assets/cart.png" alt="" />
      </button>
    );
  }
}
export default function Header({ cartItems }) {
  let total = 0;
  cartItems.forEach((el) => {
    total += Number(el.price);
  });
  return (
    <header className="header">
      <p className="header-logo">Logo</p>
      <ul className="header-links">
        <li>
          <a href="#">home</a>
        </li>
        <li>
          <a href="#">shop</a>
        </li>
        <li>
          <a href="#">pages</a>
        </li>
      </ul>
      <div className="cart-container">
        {" "}
        <CartBtn cartItems={cartItems} />
      </div>
      <p>Total: {total}$</p>
    </header>
  );
}
