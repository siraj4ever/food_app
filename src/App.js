import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./pages/layout/Layout";
import LogIn from "./pages/accounts/LogIn";
import SignUp from "./pages/accounts/SignUp";
import Home from "./pages/layout/Home";
import Setting from "./pages/layout/Setting";
import CartList from "./pages/checkout/CartList";
import Payment from "./pages/checkout/Payment";
import MyOrders from "./pages/checkout/MyOrders";

function App() {
  return (
    // <div className="row">
    //   <div className="col-12">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/cart-list" element={<CartList />} />
          <Route path="/cart-payment" element={<Payment />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
    //   </div>
    // </div>
  );
}

export default App;
