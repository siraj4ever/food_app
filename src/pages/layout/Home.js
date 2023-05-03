import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [foodFormList, setFoodFormList] = useState([]);

  useEffect(() => {
    getManageFoodList();
  }, []);

  function getManageFoodList() {
    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { userId: getItem.id };

    fetch("http://localhost:3000/userSetting?userId=" + userDetails.userId)
      .then((response) => {
        return response.json();
      })
      .then((userSetting) => {
        fetch(
          "http://localhost:3000/manageFood?userId=" + userDetails.userId
          +
          "&cityId=" +
          userSetting[0].cityId +
          "&isActive=" +
          true
        )
          .then((response) => {
            return response.json();
          })
          .then((foods) => {
            fetch("http://localhost:3000/cities?userId=" + userDetails.userId)
              .then((response) => {
                return response.json();
              })
              .then((cities) => {
                foods.map((food, index) => {
                  let currentFoodCityDetail = cities.find(
                    (city) => city.id == food.cityId
                  );
                  food.cityName = currentFoodCityDetail.city;
                });
                setFoodFormList(foods);
              });
          });
      });
  }

  function addToCart(foodId) {
    let currentFoodDetails = foodFormList.find((singleFood) => singleFood.id === foodId);
    let storedFood = JSON.parse(localStorage.getItem("cartFoods"));
    
    if(storedFood == null || storedFood == "") {
      currentFoodDetails.qty = 1
      currentFoodDetails.actualPrice = parseInt(currentFoodDetails.price)
      currentFoodDetails.price = parseInt(currentFoodDetails.price)
      let cartArray = [currentFoodDetails]
      localStorage.setItem("cartFoods", JSON.stringify(cartArray));
    }
    else{
      let checkExistFood = storedFood.find((x)=>x.id === foodId)
      if(checkExistFood == undefined) {
        currentFoodDetails.qty = 1
        currentFoodDetails.actualPrice = parseInt(currentFoodDetails.price)
        currentFoodDetails.price = parseInt(currentFoodDetails.price)
        storedFood.push(currentFoodDetails);
        localStorage.setItem("cartFoods", JSON.stringify(storedFood));
      }
      else{
        let index = storedFood.findIndex((x)=>x.id === foodId);
        storedFood[index].qty = 1 + checkExistFood.qty;
        storedFood[index].price = checkExistFood.qty * parseInt(currentFoodDetails.price);
        storedFood[index].actualPrice = parseInt(currentFoodDetails.price)
        
        localStorage.setItem("cartFoods", JSON.stringify(storedFood));
      }
    }
    navigate("/cart-list");
  }

  return (
    <>
      <div className="col">
        <div className="row">
          {foodFormList.map((x, index) => {
            return (
              <div key={index} className="card rounded-0" style={{ width: "21rem" }}>
                {/* <br/> */}
                <img
                  className="card "
                  src="images/pizza.jpg"
                  alt="Card Image"
                />
                <div className="card-body">
                  <h4 className="card-title">{x.foodName}</h4>
                  <h6 className="card-text">
                    Title: {x.title}
                    <br />
                    Price: {x.price}
                    {/* <br />
                    CityId: {x.cityId} */}
                    <br />
                    City: {x.cityName}
                  </h6>
                  {/* <li className="list-group-item">{x.description}</li> */}
                </div>
                <button
                  className="btn btn-info btn-sm shadow"
                  onClick={() => addToCart(x.id)}
                >
                  Add To Cart
                </button>
                <br/>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
