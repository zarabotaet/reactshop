import { Route } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  function handleDelete(itemId) {
    const copy = cartItems.filter((el) => el.id !== itemId);
    setCartItems(copy);
  }

  function CartTableItem({ item }) {
    const [itemCounter, setItemCounter] = useState(item.counter);
    item.counter = itemCounter;
    return (
      <Tr>
        <Td>{item.title}</Td>
        <Td>{item.price}</Td>
        <Td>
          <HStack>
            <Button
              onClick={() => {
                if (itemCounter > 1) {
                  setItemCounter((num) => num - 1);
                }
              }}
            >
              -
            </Button>
            <h3>{itemCounter}</h3>
            <Button
              onClick={() => {
                if (itemCounter < 9) {
                  setItemCounter((num) => num + 1);
                }
              }}
            >
              +
            </Button>
          </HStack>
        </Td>
        <Td>
          <Button
            colorScheme="red"
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    );
  }

  let items = cartItems.map((item) => {
    return <CartTableItem item={item} key={item.id} />;
  });

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
        <Button colorScheme="purple">
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="cart-page">
        <h2>There are no items in the cart</h2>
        <Button onClick={() => navigate(-1)} colorScheme="red">
          Add items to cart
        </Button>
      </div>
    );
  }
}
