import React, { useState } from "react";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [isError, setIsError] = useState(false);
  const [newError, setNewError] = useState(null);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    setNewError(false);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    setNewError(error);
    console.log("Error", newError);
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.get(
        "/users?username=" + response.profileObj.name
      );
      const loginUser = res.data;
      if (loginUser.withGoogle) {
        try {
          const res1 = await axios.post("/auth/loginOauth", {
            email: loginUser.email,
          });
          const user = res1.data;
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload();
        } catch (err) {
          console.log("Login File Error1");
        }
      } else {
        console.log("User not Found");
      }
    } catch (err) {
      setIsError(true);
      console.log(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#E0E0E0",
        position: "relative",
      }}
    >
      <div
        className="d-flex"
        style={{
          position: "absolute",
          width: "1000px",
          height: "450px",
          margin: "150px 200px",
          backgroundColor: "#E0E0E0",
        }}
      >
        <div className="" style={{ width: "50%", height: "100%" }}>
          <div className="mx-5 " style={{ width: "400px", marginTop: "150px" }}>
            <h1 className="font-weight-bold" style={{ color: "#1775EE" }}>
              Codecial
            </h1>
            <h5 className="pt-1">
              Connect with Friends and the world around you on Codecial
            </h5>
          </div>
        </div>
        <div style={{ width: "50%", height: "100%" }}>
          {isError && (
            <div
              className="text-center text-danger font-weight-bold"
              style={{
                width: "100%",
                height: "25px",
              }}
            >
              User not Found
            </div>
          )}
          <div
            className="card"
            style={{
              width: "400px",
              marginTop: isError ? "0px" : "25px",
              marginLeft: "50px",
              borderRadius: "10px",
              border: "0px",
            }}
          >
            <div
              style={{
                width: "350px",
                marginTop: "25px",
                marginLeft: "25px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div
                  className="d-flex align-items-center mb-3"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid gray",
                  }}
                >
                  <input
                    type="email"
                    ref={email}
                    required
                    className="form-control border-0"
                    placeholder="Email"
                  />
                </div>
                <div
                  className="d-flex align-items-center mb-3"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid gray",
                  }}
                >
                  <input
                    type="password"
                    ref={password}
                    required
                    minLength="6"
                    className="form-control border-0"
                    placeholder="Password"
                  />
                </div>
                {newError && !isFetching && (
                  <div className="text-danger">Invalid email or password</div>
                )}
                <div
                  className="d-flex align-items-center mb-3"
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "5px",
                    backgroundColor: "#1775EE",
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-block text-white font-weight-bold"
                    style={{ backgroundColor: "#1775EE" }}
                    disabled={isFetching}
                  >
                    {isFetching ? (
                      <CircularProgress color="white" size="19px" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>

                <div
                  className="d-flex align-items-center mb-3 "
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "5px",
                  }}
                >
                  <GoogleLogin
                    className="btn btn-block text-white font-weight-bold text-white bg-primary"
                    clientId="953613880079-npqf053gt80b5r5cfcgn9jkl5lntv0ob.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  >
                    <span
                      className="font-weight-bold"
                      style={{ fontSize: "15px" }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log
                      in with Google
                    </span>
                  </GoogleLogin>
                </div>
              </form>

              <div
                className="d-flex align-items-center text-center mb-3"
                style={{ width: "100%", height: "45px" }}
              >
                <a
                  className="mx-auto"
                  style={{ cursor: "pointer", color: "#1775EE" }}
                >
                  Forgot Password ?
                </a>
              </div>

              <Link to="/register" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center mb-2 mx-auto"
                  style={{
                    width: "70%",
                    height: "45px",
                    borderRadius: "5px",
                    backgroundColor: "#42B728",
                  }}
                >
                  <button
                    type="text"
                    className="btn btn-block text-white font-weight-bold"
                    style={{ backgroundColor: "#42B728" }}
                  >
                    Create a New Account
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
