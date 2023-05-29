import { useState, useEffect } from "react";

function Sorter({ listFilter, setListFilter }) {
  const [sorterValue, setSorterValue] = useState("recent");
  console.log(listFilter);
  useEffect(() => {
    if (sorterValue === "recent") {
      let copy = [...listFilter];
      copy.sort((a, b) => {
        return a.id - b.id;
      });
      setListFilter(copy);
    } else if (sorterValue === "low") {
      let copy = [...listFilter];
      copy.sort((a, b) => {
        return a.price - b.price;
      });
      setListFilter(copy);
    } else if (sorterValue === "high") {
      let copy = [...listFilter];
      copy.sort((a, b) => {
        return b.price - a.price;
      });
      setListFilter(copy);
    }
  }, [sorterValue, setListFilter]);

  return (
    <select
      name="sorter"
      id="sorter"
      onChange={(e) => {
        setSorterValue(e.target.value);
      }}
    >
      <option value="recent">Featured</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  );
}
function Sidebar({ list, listFilter, setListFilter }) {
  let types = [];
  list.forEach((el) => {
    if (types.includes(el.category)) {
    } else {
      types.push(el.category);
    }
  });
  let domTypes = [...types].map((type) => {
    return (
      <li>
        <button
          onClick={() => {
            setListFilter(
              [...list].filter((product) => {
                if (product.category === type) {
                  return product;
                }
              })
            );
          }}
        >
          {type}
        </button>
      </li>
    );
  });
  return (
    <ul className="sidebar">
      <li>
        <button onClick={() => setListFilter(list)}>All</button>
      </li>
      {domTypes}
      <Sorter listFilter={listFilter} setListFilter={setListFilter} />
    </ul>
  );
}
function Products({ list, cartItems, setCartItems }) {
  let products = [...list].map((product) => {
    return (
      <div className="product">
        <div className="product-top">
          <img src={product.image} alt="" />
          <h1>{product.title}</h1>
        </div>
        <div className="product-bottom">
          <h2>{product.price}$</h2>

          <button
            onClick={() => {
              setCartItems([...cartItems, product]);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  });
  return <div className="main-products">{products}</div>;
}
export default function HomePage({ cartItems, setCartItems }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listFilter, setListFilter] = useState(null);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          setError(res.error);
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
        console.log("something");
        setLoading(false);
        setData(res);
        setListFilter(res);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <Sidebar
          list={data}
          listFilter={listFilter}
          setListFilter={setListFilter}
        />
        <Products
          list={listFilter}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
    );
  }
}
