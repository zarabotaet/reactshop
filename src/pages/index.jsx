import { Route, Routes } from "react-router-dom";
import { ProductCard } from "./product";
import { Home } from "./home";
import { Cart } from "./cart";
import { Checkout } from "./checkout";

export function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={"/product/:productId"} element={<ProductCard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
