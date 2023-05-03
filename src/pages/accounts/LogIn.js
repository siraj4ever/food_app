import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogIn() {
  const navigate = useNavigate(); 
  const [loginForm, setLoginForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setLoginForm({ ...loginForm, [targetName]: targetValue });
  }

  function logIn() {
    let re = /\S+@\S+\.\S+/;   //this is email regex
    setInvalidEmail(false);
    setEmailRequiredError(false);
    setPasswordRequiredError(false);

    if (loginForm.email == "") {
      setEmailRequiredError(true);
      setPasswordRequiredError(true);
      return;
    } else {
      setEmailRequiredError(false);
      if (re.test(loginForm.email) == false) {
        setInvalidEmail(true);
        return;
      }

      fetch(
        "http://localhost:3000/registeredUser?email=" +
          loginForm.email +
          "&password=" +
          loginForm.password
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            toast("login successfull");
            let userDetails = { email: data[0].email, id: data[0].id};
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            navigate("/home");
          } else {
            toast("email or password incorrect");
            return;
          }
        });
    }
  }

  return (
    <div className="container">
      <div className="col-12 shadow p-3 mb-5 bg-white rounded">
        <br />
        Email:
        <input
          className="form-control"
          type="email"
          name="email"
          value={loginForm.email}
          placeholder="srj@gmail.com"
          onChange={(event) => onInputChange(event)}
        />
        {/* {emailRequiredError === true && <p>email required</p>}
        {invalidEmail === true && <p>invalid email</p>} */}
        Password:
        <input
          className="form-control"
          type="password"
          name="password"
          value={loginForm.password}
          placeholder="siraj"
          onChange={(event) => onInputChange(event)}
        />
        {/* {passwordRequiredError === true && <p>password required</p>} */}
        <br />
        <button className="form-control btn btn-info" onClick={() => logIn()}>
          Log In
        </button>
        <Link to="/sign-up">Create account / sign up</Link>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LogIn;
