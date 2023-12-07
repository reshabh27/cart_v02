import { FaChevronUp, FaChevronDown } from "react-icons/fa";


const CartItem = ({ id, img, title, price, amount,increase, decrease, remove }) => {
  return (
    <article
      className="grid-item"
      // style={{
      //   display: "flex",
      //   width: "50%",
      //   margin: "100px auto",
      //   justifyContent: "space-between",
      // }}
    >
      <img src={img} alt={title} style={{ height: "150px" }} />
      <div>
        <h5>{title}</h5>
        <span>${price}</span>

      <div style={{ marginTop: "10px" }}>
        {/* increase amount */}
        <button onClick={() => increase(id)}>
          <FaChevronUp />
        </button>

        {/* amount */}
        <span style={{padding:'10px'}}>{amount}</span>

        {/* decrease amount */}
        <button onClick={() => decrease(id)}>
          <FaChevronDown />
        </button>
        
        {/* remove button */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => remove(id)}>remove</button>
        </div>
      </div>

      </div>
    </article>
  );
};

export default CartItem;
