import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  $cartItemsList,
  $totalPrice,
  CartItemT,
  decItemAmount,
  deleteItemInCart,
  incItemAmount,
} from '../model/cart'

function CartItem({ title, price, id, amount }: CartItemT) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>
        <HStack>
          <Button onClick={() => decItemAmount(id)}>-</Button>
          <h3>{amount}</h3>
          <Button onClick={() => incItemAmount(id)}>+</Button>
        </HStack>
      </Td>
      <Td>
        <Button
          colorScheme="red"
          onClick={() => {
            deleteItemInCart(id)
          }}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  )
}

export function Cart() {
  const navigate = useNavigate()
  const [cartItems, totalPrice] = useUnit([$cartItemsList, $totalPrice])

  const items = cartItems.map((item) => {
    return <CartItem {...item} key={item.id} />
  })

  if (cartItems.length > 0) {
    return (
      <div className="cart-page">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>{items}</Tbody>
          </Table>
        </TableContainer>
        <Button onClick={() => navigate(-1)} colorScheme="blue">
          Back
        </Button>
        <p>Total price: {totalPrice}$</p>
        <Button colorScheme="purple">
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="cart-page">
      <h2>There are no items in the cart</h2>
      <Button onClick={() => navigate(-1)} colorScheme="red">
        Add items to cart
      </Button>
    </div>
  )
}
