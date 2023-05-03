import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyOrders() {
  const navigate = useNavigate();
  const [orderDetailsList, setOrderDetailsList] = useState([]);

  useEffect(() => {
    getPaymentDetails();
  }, []);

  function getPaymentDetails() {
    // debugger;
    let userId = JSON.parse(localStorage.getItem("userDetails"));

    fetch("http://localhost:3000/payment?userId=" + userId.id)
      .then((response) => response.json())
      .then((responseData) => {
        fetch("http://localhost:3000/manageFood?userId=" + userId.id)
          .then((response) => response.json())
          .then((FoodsList) => {
            let a = responseData.map((x, index) => {
              // debugger;
              let totalPrice = 0;
              return {
                paymentDetails: x.paymentDetails.map((z, index) => {
                  // debugger;
                  let foodIdFind = FoodsList.find(
                    (foodName) => foodName.id === z.foodId
                  );
                  z.foodName = foodIdFind.foodName;
                  z.price = foodIdFind.price;
                  z.subTotal = z.price * z.qty;
                  totalPrice = totalPrice + z.subTotal;
                  // totalPrice += z.subTotal
                  x.totalPrice = totalPrice;
                }),
              };
            });
            setOrderDetailsList(responseData);
          });
      });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {orderDetailsList.map((x, index) => {
            return (
              <div key={index}>
                <div className="card">
                  <div className="btn btn-secondary">
                    {/* <h5>UserId: {x.userId}</h5> */}
                    <h5>Order Number : {x.id}</h5>
                    Total Price: ₹{x.totalPrice}
                  </div>
                </div>
                {x.paymentDetails.map((z, index) => {
                  return (
                    <div key={index}>
                      <div className="card">
                        <div className="card-body h6">
                          {/* Id: {z.foodId}
                          <br /> */}
                          Food Name: {z.foodName}
                          <br />
                          <div className="text-danger">Qty: {z.qty}</div>
                          Price: ₹{z.price}
                          <br />
                          Sub Total: ₹{z.subTotal}
                          <br />
                          Payment Status: {z.paymentReceived ? "✔️Received" : "❌Failed"}
                          <br />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <br />
              </div>
            );
          })}
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default MyOrders;
