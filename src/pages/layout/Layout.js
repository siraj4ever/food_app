import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
function Layout() {
  const [noOfCartItem, setNoOfCartItem] = useState();

  useEffect(() => {
    debugger;
    let cardFoods = JSON.parse(localStorage.getItem("cartFoods"));
    // let arrayLength = cardFoods.length
    // setNoOfCartItem(arrayLength);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="navbar-brand">ᖴටටᕲ ᗩᎮᎮ</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <div className="nav-link">
                <Link to="/home">Home</Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <Link to="/setting">Setting</Link>
              </div>
            </li>

            <li className="nav-item active">
              <div className="nav-link">
                <Link to="/">LogIn/SignUp</Link>
              </div>
            </li>

            <li className="nav-item active">
              <div className="nav-link">
                <Link to="/cart-list">&#128722;{noOfCartItem} </Link>
              </div>
            </li>
          </ul>

          <form className="form-inline mt-2 mt-md-0 ">
            <input
              className="form-control-sm"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button className="btn btn-outline-info btn-sm">Go</button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
