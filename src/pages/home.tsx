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
