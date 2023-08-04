import { Route } from "react-router-dom";
import { Products } from "../products";
import { Sidebar } from "../sidebar";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { products$ } from "../model/products";

export function Home() {
  const list = useUnit(products$);
  const [listFilter, setListFilter] = useState(list);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let copy = [...list];
    if (minPrice !== "" && maxPrice !== "") {
      copy = copy.filter((el) => el.price >= minPrice && el.price <= maxPrice);
    }
    setListFilter(copy);
  }, [minPrice, maxPrice]);

  return (
    <div className="main">
      <Sidebar
        list={list}
        setListFilter={setListFilter}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <Products list={listFilter} />
    </div>
  );
}
