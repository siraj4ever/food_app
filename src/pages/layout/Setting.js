import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Setting() {
  const navigate = useNavigate();
  const [cityNameForm, setCityNameForm] = useState({
    id: "",
    city: "",
  });
  const [citiesList, setCitiesList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("ManageCityTab");
  const [updateToggle, setUpdateToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    email: "",
  });
  const [dropdownCityId, setDropdownCityId] = useState("");
  const [dropdownId, setDropdownId] = useState("");
  const [foodForm, setFoodForm] = useState({
    id: "",
    foodName: "",
    title: "",
    price: "",
    cityId: "",
    description: "",
    isActive: false,
  });
  const [foodFormList, setFoodFormList] = useState([]);
  const [manageFoodFormShowHide, setManageFoodFormShowHide] = useState(false);
  const [manageFoodListShowHide, setManageListFormShowHide] = useState(false);

  const [foodNameRequiredError, setFoodNameRequiredError] = useState(false);
  const [titleRequiredError, setTitleRequiredError] = useState(false);
  const [priceRequiredError, setPriceRequiredError] = useState(false);
  const [cityRequiredError, setCityRequiredError] = useState(false);
  const [descriptionRequiredError, setDescriptionRequiredError] =
    useState(false);

  useEffect(() => {
    //value get from localStorage, email is key to get email's value
    // let getItem = localStorage.getItem("email");
    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(getItem);

    fetch("http://localhost:3000/userSetting?userId=" + getItem.id)
      .then((response) => response.json())
      .then((responseData) => {
        setDropdownCityId(responseData[0].cityId);
        setDropdownId(responseData[0].id);
      });
    getCitiesList();
    getManageFoodList();
  }, []);

  function getCitiesList() {
    // debugger;
    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { userId: getItem.id };
    fetch("http://localhost:3000/cities?userId=" + userDetails.userId)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setCitiesList(responseData);
      });
  }

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setCityNameForm({ ...cityNameForm, [targetName]: targetValue });
  }

  function saveCity() {
    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { userId: getItem.id, city: cityNameForm.city };

    if (cityNameForm.id == "" || cityNameForm.id == undefined) {
      fetch("http://localhost:3000/cities", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          getCitiesList();
          clearForm();
        });
    } else {
      fetch("http://localhost:3000/cities/" + cityNameForm.id, {
        // put/update city name using id
        method: "PUT",
        body: JSON.stringify(cityNameForm),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          clearForm();
          getCitiesList();
        });
      setUpdateToggle(false);
    }
  }

  function editCity(id) {
    //get city name and fill form using id
    fetch("http://localhost:3000/cities/" + id)
      .then((response) => response.json())
      .then((responseData) => {
        setCityNameForm(responseData);
        setUpdateToggle(true);
      });
  }

  function deleteCity(id) {
    fetch("http://localhost:3000/cities/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        getCitiesList();
      });
  }

  function clearForm() {
    setCityNameForm({ id: "", city: "" });
  }

  function changeTab(tabName) {
    setSelectedTab(tabName);
  }

  function logOut() {
    localStorage.removeItem("userDetails");
    navigate("/");
  }

  function dropdownInputChange(event) {
    debugger
    let targetValue = event.target.value;
    setDropdownCityId(targetValue);

    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    let getId = { userId: getItem.id, cityId: targetValue };
    debugger;
    if (dropdownCityId == "" || dropdownCityId == undefined) {
      fetch("http://localhost:3000/userSetting", {
        method: "POST",
        body: JSON.stringify(getId),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          debugger;
        });
    } else {
      fetch("http://localhost:3000/userSetting/" + dropdownId, {
        method: "PUT",
        body: JSON.stringify(getId),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {});
    }
  }

  function onChangeFoodForm(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setFoodForm({ ...foodForm, [targetName]: targetValue });
  }

  function isActiveCheckbox(event) {
    let { checked } = event.target;
    setFoodForm({ ...foodForm, isActive: checked });
  }

  function getManageFoodList() {
    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { userId: getItem.id };
    fetch("http://localhost:3000/manageFood?userId=" + userDetails.userId)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setFoodFormList(responseData);
        setManageFoodFormShowHide(false);
        setManageListFormShowHide(true);
      });
  }

  function saveFoodForm() {
    if (foodForm.foodName == "") {
      setFoodNameRequiredError(true);
      return;
    } else {
      setFoodNameRequiredError(false);
    }

    if (foodForm.title == "") {
      setTitleRequiredError(true);
      return;
    } else {
      setTitleRequiredError(false);
    }

    if (foodForm.price == "") {
      setPriceRequiredError(true);
      return;
    } else {
      setPriceRequiredError(false);
    }

    if (foodForm.cityId == "") {
      setCityRequiredError(true);
      return;
    } else {
      setCityRequiredError(false);
    }

    if (foodForm.description == "") {
      setDescriptionRequiredError(true);
      return;
    } else {
      setDescriptionRequiredError(false);
    }

    let getItem = JSON.parse(localStorage.getItem("userDetails"));
    // let userDetails = {
    //   userId: getItem.id,
    //   foodName: foodForm.foodName,
    //   title: foodForm.title,
    //   price: foodForm.price,
    //   cityId: foodForm.cityId,
    //   description: foodForm.description,
    //   isActive: foodForm.isActive,
    // };
    foodForm.userId = getItem.id;

    if (foodForm.id === "" || foodForm.id === undefined) {
      fetch("http://localhost:3000/manageFood", {
        method: "POST",
        body: JSON.stringify(foodForm),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          getManageFoodList();
          clearFoodForm();
          toast("Saved Successfully");
        });
    } else {
      fetch("http://localhost:3000/manageFood/" + foodForm.id, {
        method: "PUT",
        body: JSON.stringify(foodForm),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          getManageFoodList();
          clearFoodForm();
          toast("Item Updated Successful");
        });
      setManageFoodFormShowHide(false);
      setManageListFormShowHide(true);
    }
  }

  function editFoodListData(id) {
    fetch("http://localhost:3000/manageFood/" + id, {})
      .then((response) => response.json())
      .then((responseData) => {
        setFoodForm(responseData);
        setManageFoodFormShowHide(true);
        setManageListFormShowHide(false);
      });
  }

  function deleteFoodListData(id) {
    debugger;
    fetch("http://localhost:3000/manageFood/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        getManageFoodList();
        toast("Item Deleted");
      });
  }

  function clearFoodForm() {
    setFoodForm({
      id: "",
      foodName: "",
      title: "",
      price: "",
      cityId: "",
      description: "",
      isActive: false,
    });
  }

  function addFood() {
    setManageFoodFormShowHide(true);
    setManageListFormShowHide(false);
    clearFoodForm();
  }

  function backToList() {
    setManageFoodFormShowHide(false);
    setManageListFormShowHide(true);
    clearFoodForm();
  }

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={
              selectedTab == "ManageCityTab" ? "nav-link active" : "nav-link"
            }
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={() => changeTab("ManageCityTab")}
          >
            Manage City
          </button>

          <button
            className={
              selectedTab == "ManageSettingTab" ? "nav-link active" : "nav-link"
            }
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={() => changeTab("ManageSettingTab")}
          >
            Manage Setting
          </button>

          <button
            className={
              selectedTab == "ManageFood" ? "nav-link active" : "nav-link"
            }
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={() => changeTab("ManageFood")}
          >
            Manage Food
          </button>

          <button
            className={selectedTab == "LogOut" ? "nav-link active" : "nav-link"}
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={() => changeTab("LogOut")}
          >
            Log Out
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className={
            selectedTab == "ManageCityTab"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <br />
          <div className="container">
            <div className="col-12">
              <div className="row">
                <div className="col">
                  <input
                    className="form-control "
                    type="text"
                    name="city"
                    value={cityNameForm.city}
                    placeholder="Enter City"
                    onChange={(event) => onInputChange(event)}
                  />
                </div>
                <div className="col">
                  {updateToggle == false && (
                    <button className="btn btn-info" onClick={() => saveCity()}>
                      Save
                    </button>
                  )}
                  {updateToggle == true && (
                    <button className="btn btn-info" onClick={() => saveCity()}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />

          <hr />
          <div className="container">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {citiesList.map((x, index) => {
                    return (
                      <tr key={index}>
                        <td>{x.id}</td>
                        <td>{x.city}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => editCity(x.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteCity(x.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className={
            selectedTab == "ManageSettingTab"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className="container">
            <div className="col-12">
              <br />
              <h5>Id: {userDetails.id}</h5>
              <h5>Email: {userDetails.email}</h5>

              <br />

              <select
                name="city"
                value={dropdownCityId}
                onChange={(event) => dropdownInputChange(event)}
              >
                <option value="">Select City</option>
                {citiesList.map((x, index) => {
                  return (
                    <option value={x.id} key={index}>
                      {x.city}
                    </option>
                  );
                })}
              </select>

              <br />
              <br />
            </div>
          </div>
        </div>

        <div
          className={
            selectedTab == "ManageFood"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          {manageFoodFormShowHide === true && (
            <div className="container">
              <div className="col-12">
                <br />
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => backToList()}
                >
                  Back
                </button>
                <br />
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      name="foodName"
                      value={foodForm.foodName}
                      placeholder="Food Name"
                      onChange={(event) => onChangeFoodForm(event)}
                    />
                    {foodNameRequiredError === true && (
                      <p>food name required</p>
                    )}
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      value={foodForm.title}
                      placeholder="Title"
                      onChange={(event) => onChangeFoodForm(event)}
                    />
                    {titleRequiredError === true && <p>title required</p>}
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      name="price"
                      value={foodForm.price}
                      placeholder="Price"
                      onChange={(event) => onChangeFoodForm(event)}
                    />
                    {priceRequiredError === true && <p>price required</p>}
                  </div>
                  <div className="col">
                    <select
                      className="form-control"
                      name="cityId"
                      value={foodForm.cityId}
                      onChange={(event) => onChangeFoodForm(event)}
                    >
                      <option value="">Select City</option>
                      {citiesList.map((x, index) => {
                        return (
                          <option value={x.id} key={index}>
                            {x.city}
                          </option>
                        );
                      })}
                    </select>
                    {cityRequiredError === true && <p>city id required</p>}
                  </div>
                </div>
                <br />
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  value={foodForm.description}
                  placeholder="Description"
                  onChange={(event) => onChangeFoodForm(event)}
                ></textarea>
                {descriptionRequiredError === true && (
                  <p>description required</p>
                )}
                <br />
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={foodForm.isActive}
                  onChange={(event) => isActiveCheckbox(event)}
                />
                Is Active
                <br />
                <br />
                <button
                  className="form-control btn btn-info"
                  onClick={() => saveFoodForm()}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <br />
          {manageFoodListShowHide === true && (
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => addFood()}
                >
                  Add Food
                </button>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Food Name</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>City Id</th>
                      <th>Description</th>
                      <th>Is Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodFormList.map((food, index) => {
                      return (
                        <tr key={index}>
                          <td>{food.id}</td>
                          <td>{food.foodName}</td>
                          <td>{food.title}</td>
                          <td>{food.price}</td>
                          <td>{food.cityId}</td>
                          <td>{food.description}</td>
                          <td>{food.isActive ? "✔️Active" : "❌Inactive"}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => editFoodListData(food.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteFoodListData(food.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div
          className={
            selectedTab == "LogOut"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className="container">
            <div className="col-12">
              <br />
              <button className="btn btn-info " onClick={() => logOut()}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Setting;
