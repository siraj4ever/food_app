import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CartList() {
  const navigate = useNavigate();
  const [foodsDetail, setFoodsDetail] = useState([]);
  const [totalFoodAmount, setTotalFoodAmount] = useState();

  useEffect(() => {
    debugger;
    let cardFoods = JSON.parse(localStorage.getItem("cartFoods"));
    setFoodsDetail(cardFoods);

    let totalAmount = 0;
    cardFoods.map((cardFood, index) => {
      totalAmount = totalAmount + cardFood.price;
    });
    setTotalFoodAmount(totalAmount);
  }, []);

  function decrease(id) {
    let storedFood = JSON.parse(localStorage.getItem("cartFoods"));
    let findExistFood = storedFood.find((x) => x.id == id);
    if (findExistFood) {
      let index = storedFood.findIndex((x) => x.id === id);
      storedFood[index].qty = findExistFood.qty - 1;
      storedFood[index].price =
        findExistFood.qty * parseInt(findExistFood.actualPrice);
      localStorage.setItem("cartFoods", JSON.stringify(storedFood));
      setFoodsDetail(storedFood);

      let totalAmount = totalFoodAmount - parseInt(findExistFood.actualPrice);
      setTotalFoodAmount(totalAmount);
    }
  }

  function increase(id) {
    // debugger;
    let storedFood = JSON.parse(localStorage.getItem("cartFoods"));
    let findExistFood = storedFood.find((x) => x.id == id);
    if (findExistFood) {
      let index = storedFood.findIndex((x) => x.id === id);
      storedFood[index].qty = 1 + findExistFood.qty;
      storedFood[index].price =
        findExistFood.qty * parseInt(findExistFood.actualPrice);
      localStorage.setItem("cartFoods", JSON.stringify(storedFood));
      setFoodsDetail(storedFood);

      let totalAmount = totalFoodAmount + parseInt(findExistFood.actualPrice);
      setTotalFoodAmount(totalAmount);
    }
  }

  function removeItemFromCart(id) {
    let storedFood = JSON.parse(localStorage.getItem("cartFoods"));
    let findExistFood = storedFood.find((x) => x.id == id);
    let findExistFoodIndex = storedFood.findIndex(
      (singleFood) => singleFood.id == id
    );
    storedFood.splice(findExistFoodIndex, 1);
    localStorage.setItem("cartFoods", JSON.stringify(storedFood));
    setFoodsDetail(storedFood);

    let totalAmount = totalFoodAmount - findExistFood.price;
    setTotalFoodAmount(totalAmount);
  }

  function orderNow() {
    navigate("/cart-payment");
  }

  return (
    <>
      <div className="container">
        <div className="col">
          <Link to="/my-orders">My Orders</Link>
          <br />
          <br />
          {foodsDetail.map((x, index) => {
            return (
              <div
                key={index}
                className="row shadow p-3 mb-5 bg-white rounded-3"
              >
                <div className="col">
                  <img
                    className="card-img-top rounded-3"
                    src="images/pizza.jpg"
                    alt="Card Image"
                    style={{ width: "20rem" }}
                  />
                </div>
                <div className="col">
                  <h3 className="card-title text-uppercase">{x.foodName}</h3>
                  <hr />
                  {x.title}
                  <hr />
                  {x.cityName}
                  <hr />
                  {x.description}
                  <hr />
                  Price ₹{x.actualPrice}
                  <hr />
                  Total Qty Price ₹{x.price}
                  <hr />
                  <div className="input-group mb-3 input-group-sm">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => decrease(x.id)}
                    >
                      -
                    </button>
                    <input
                      className="btn  btn-sm disabled border-info"
                      value={x.qty}
                      readOnly
                    />
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => increase(x.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItemFromCart(x.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-left">
            <h6>Total Amount: {totalFoodAmount} </h6>
          </div>
          <br />
          <button
            className="form-control btn btn-info"
            onClick={() => orderNow()}
          >
            Order Now
          </button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default CartList;
