import { useEffect, useState, useContext } from "react";
import { createStore, createEvent } from "effector";
import { useStore, useUnit } from "effector-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Loader } from "./loader";
import { Pages } from "./pages";
import { products$, productsPending$ } from "./model/products";
import { appLoaded } from "./model";

export function App() {
  const [products, productsPending] = useUnit([products$, productsPending$]);

  useEffect(() => {
    appLoaded();
  }, []);

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
