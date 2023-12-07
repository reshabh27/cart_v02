import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getTotals } from "./utils";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";

const url = "https://www.course-api.com/react-useReducer-cart-project";



const CartContainer = () => {
  const [cart, setCart] = useState(new Map());
  const [loading, setLoading] = useState(1);
  const { totalAmount, totalCost } = getTotals(cart);
  
  const fetchData = async () => {
    setLoading(true);

    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        const newCart = new Map(data.map((item) => [item.id, item]));
        setCart(newCart);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });


  };


  useEffect(() => {
    fetchData();
  }, []);

  
  const clearCart = () => {
    setCart(new Map());
  }


  const remove  = (id) =>{
    // console.log("remove");
    const newCart = new Map(cart);
    newCart.delete(id);
    setCart(newCart);
  } 

  const increase = (id) => {
    // console.log("inc");
    const newCart = new Map(cart);
    const itemId = id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    setCart(newCart);
  }

  const decrease = (id) => {
    // console.log("dec");
    const newCart = new Map(cart);
    const itemId = id;
    const item = newCart.get(itemId);

    if (item.amount === 1) {
      newCart.delete(itemId);
      setCart(newCart);
      return;
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    setCart(newCart);
  }

  const cartArray = Array.from(cart.entries());

  if (loading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: "6rem" }}></div>
      </main>
    );
  }
  if (cartArray.length === 0) {
    return (
      <section style={{textAlign:'center'}}>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 >is currently empty</h4>
        </header>
      </section>
    );
  }
  
  return (
    <section>
      {/* cart header */}
      <header style={{ textAlign: "center" }}>
        <h2>your bag </h2>
        <div className='nav-container'>
          <FaCartPlus className='cart-icon' />
          <div className='amount-container'>
            <p className='total-amount'>{totalAmount}</p>
          </div>
        </div>
      </header>

      {/* cart items */}
      <div className="grid-container">
        {cartArray.map((cartItem) => {
          const [id, item] = cartItem;
          return <CartItem key={id} {...item} remove={remove} increase={increase} decrease={decrease} />;
        })}
      </div>

      {/* cart footer */}
      <footer className="footstyle" style={{marginBottom:'100px'}}>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" ,paddingBottom: '10px'}}>
          <h2> Total </h2>
          <span
            style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
          >
            ${totalCost.toFixed(2)}
          </span>
        </div>
        <button
          style={{
            position: "absolute",
            textAlign: "center",
            marginBottom: "100px",
            marginTop:'20px',
            left: "46%",
            backgroundColor:'green',
            color:'white',
            padding:'10px'
          }}
          onClick={clearCart}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
