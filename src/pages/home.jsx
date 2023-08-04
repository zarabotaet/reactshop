import { Route } from "react-router-dom";
import { Products } from "../products";
import { Sidebar } from "../sidebar";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { products$ } from "../model/products";

export function Home() {
  return (
    <div className="main">
      <Sidebar />
      <Products />
    </div>
  );
}
