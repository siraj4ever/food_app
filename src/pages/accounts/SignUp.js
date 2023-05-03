import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const [registeredUser, setRegisteredUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [firstNameRequiredError, setFirstNameRequiredError] = useState(false);
  const [lastNameRequiredError, setLastNameRequiredError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [existEmailError, setExistEmailError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setRegisteredUser({ ...registeredUser, [targetName]: targetValue });
  }

  function signUp() {
    let re = /\S+@\S+\.\S+/;

    debugger;
    if (registeredUser.firstName == "") {
      setFirstNameRequiredError(true);
      return;
    } else {
      setFirstNameRequiredError(false);
    }

    if (registeredUser.lastName == "") {
      setLastNameRequiredError(true);
      return;
    } else {
      setLastNameRequiredError(false);
    }

    if (!registeredUser.email) {
      // if(registeredUser.email!=='' || registeredUser.email !== null)
      setEmailRequiredError(true);
      // blank return means value checked & go back
      return;
    } else {
      setEmailRequiredError(false);
    }

    if (!registeredUser.password) {
      setPasswordRequiredError(true);
      return;
    } else {
      setPasswordRequiredError(false);
    }
    
    if (re.test(registeredUser.email) == false) {
      setInvalidEmail(true);
      return;
    }

    fetch("http://localhost:3000/registeredUser?email=" + registeredUser.email)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //it means check email in database, 0 indicate index
        if (data.length > 0) {
          // alert("email already exist");
        } else {
          fetch("http://localhost:3000/registeredUser", {
            method: "POST",
            body: JSON.stringify(registeredUser),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then(() => {
              debugger;
              navigate("/");
            });
        }
      });
  }

  function onInputBlurChange(event) {
    debugger;
    let targetValue = event.target.value;
    let re = /\S+@\S+\.\S+/;

    setExistEmailError(false);
    setInvalidEmail(false);
    setEmailRequiredError(false);
    debugger;

    if (registeredUser.email == "") {
      setEmailRequiredError(true);
    } else {
      if (re.test(registeredUser.email) == false) {
        setInvalidEmail(true);
        return;
      }

      fetch("http://localhost:3000/registeredUser?email=" + targetValue)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          debugger;
          if (data.length > 0) {
            //if greater then 0 then show error message
            setExistEmailError(true);
          } else {
            setExistEmailError(false);
          }
        });
    }
  }

  return (
    <>
      <div className="container">
        <div className="col-12 shadow p-3 mb-5 bg-white rounded">
          <br />
          <br />
          <h6>First Name: </h6>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={registeredUser.firstName}
            placeholder="firstname"
            onChange={(event) => onInputChange(event)}
          />
          {firstNameRequiredError === true && <p>first name is required</p>}
          <h6>Last Name: </h6>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={registeredUser.lastName}
            placeholder="lastname"
            onChange={(event) => onInputChange(event)}
          />
          {lastNameRequiredError === true && <p>last name is required</p>}
          <h6>Email: </h6>
          <input
            className="form-control"
            type="email"
            name="email"
            value={registeredUser.email}
            placeholder="email"
            onChange={(event) => onInputChange(event)}
            onBlur={(event) => onInputBlurChange(event)}
          />
          {emailRequiredError === true && <p>email is required</p>}
          {existEmailError === true && <p>email already exist</p>}
          {invalidEmail === true && <p>invalid email</p>}
          <h6>Password: </h6>
          <input
            className="form-control"
            type="password"
            name="password"
            value={registeredUser.password}
            placeholder="password"
            onChange={(event) => onInputChange(event)}
          />
          {passwordRequiredError === true && <p>password is required</p>}
          <br />
          <button
            className="form-control btn btn-info"
            onClick={() => signUp()}
          >
            SignUp
          </button>
          <Link to="/">Already registered / log in</Link>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default SignUp;
