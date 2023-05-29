import { useEffect, useState } from "react";
import Header from "./header";
import HomePage from "./home";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Header cartItems={cartItems}></Header>
      <HomePage cartItems={cartItems} setCartItems={setCartItems}></HomePage>
    </>
  );
}

export default App;
