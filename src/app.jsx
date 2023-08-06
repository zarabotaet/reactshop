import { createEvent, createStore } from 'effector'
import { useStore, useUnit } from 'effector-react'
import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './header'
import { Loader } from './loader'
import { appLoaded } from './model'
import { products$, productsPending$ } from './model/products'
import { Pages } from './pages'

appLoaded()

export function App() {
  const [products, productsPending] = useUnit([products$, productsPending$])

  if (productsPending) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <Pages />
    </>
  )
}
