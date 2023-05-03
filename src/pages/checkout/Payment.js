import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const navigate = useNavigate();
  const [cartFoodsDetail, setCartFoodsDetail] = useState([]);
  const [totalAmount, setTotalFoodAmount] = useState();

  useEffect(() => {
    let cardFoods = JSON.parse(localStorage.getItem("cartFoods"));
    setCartFoodsDetail(cardFoods);

    let totalAmount = 0;
    cardFoods.map((cardFood, index) => {
      totalAmount = totalAmount + cardFood.price;
    });
    setTotalFoodAmount(totalAmount);
  }, []);

  function payNow() {
    // debugger;
    let storedFood = JSON.parse(localStorage.getItem("cartFoods"));
    let userId = JSON.parse(localStorage.getItem("userDetails"));
    let paymentDetailsArray = storedFood.map((x, index) => {
      return {
        userId: x.userId,
        foodId: x.id,
        qty: x.qty,
        paymentReceived: true,
      };
    });

    let paymentObject = {
      id: "",
      userId: userId.id,
      paymentDetails: paymentDetailsArray,
    };

    fetch("http://localhost:3000/payment", {
      method: "POST",
      body: JSON.stringify(paymentObject),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        localStorage.removeItem("cartFoods");
        toast("Order has been placed");
        navigate("/my-orders");
      });
  }

  return (
    <>
      {cartFoodsDetail.map((x, index) => {
        return (
          <div key={index}>
            <div className="card shadow p-3">
              <div className="card-header text-black bg-light mb-3 ">
                <h5>{x.foodName}</h5>
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <footer className="footer">
                    Price: <cite title="Source Title">₹{x.actualPrice}</cite>
                  </footer>
                  <hr />
                  <footer className="footer">
                    Qty: <cite title="Source Title">{x.qty}</cite>
                  </footer>
                  <hr />
                  <footer className="footer">
                    Sub-Total: <cite title="Source Title">₹{x.price}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <br />
          </div>
        );
      })}
      <button className="form-control btn btn-info" onClick={() => payNow()}>
        Pay ₹{totalAmount}
      </button>
      <br />
      <br />
      <ToastContainer />
    </>
  );
}

export default Payment;
