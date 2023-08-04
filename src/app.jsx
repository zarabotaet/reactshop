import { useEffect, useState, useContext } from "react";
import { createStore, createEvent } from "effector";
import { useStore, useUnit } from "effector-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Loader } from "./loader";
import { Pages } from "./pages";
import { products$, productsPending$ } from "./model/products";
import { appLoaded } from "./model";

appLoaded();

export function App() {
  const [products, productsPending] = useUnit([products$, productsPending$]);

  if (productsPending) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Pages />
    </>
  );
}
