import { useUnit } from 'effector-react'
import { Header } from './header'
import { Loader } from './loader'
import { appLoaded } from './model'
import { $productsPending } from './model/products'
import { Pages } from './pages'

appLoaded()

export function App() {
  const productsPending = useUnit($productsPending)

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
