import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { products$ } from '../model/products'
import { Products } from '../products'
import { Sidebar } from '../sidebar'

export function Home() {
  return (
    <div className="main">
      <Sidebar />
      <Products />
    </div>
  )
}
