import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextApi from "../components/ContextApi";
import "./css/LoginCss.css";
import back from "../screens/images/backGroundTest.png";

export default function Login() {
  const LoginStyle = {
    width: "auto",
    height: "40px",
    borderRadius: "60px",
    boxShadow: "inset 0px 0px 25px 0px aqua",
    border: "none",
    outline: "none",
    color: "white",
    fontWeight: "bolder",
    backgroundColor: "transparent",
  };

  const contextStat = useContext(ContextApi);
  let navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    mobileNumber: "",
    schoolBoard: "",
    schoolStandard: "",
  });

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("https://the-teencher-api.vercel.app/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        city: credentials.city,
        state: credentials.state,
        schoolBoard: credentials.schoolBoard,
        schoolStandard: credentials.schoolStandard,
        mobileNumber: credentials.mobileNumber,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credential");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch("https://the-teencher-api.vercel.app/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("email or password wrong");
    }
    if (json.success) {
      const userData = json.userData;
      console.log("userData");
      console.log(userData);
      // contextStat.setuser(userData);
      const authtoken = json.authToken;
      console.log(authtoken);

      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"))
      await localStorage.setItem("userData", JSON.stringify(userData));

      setTimeout(() => {
        navigate("../StudentHome");
      }, 1000);
    }
  };

  return (
    <div
      className=" container-fluid d-flex justify-content-center align-items-center "
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        position: "absolute",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div
        className="text-center boxContainer"
        style={{ backgroundColor: "transparent", width: "700px" }}
      >
        {/* <p style={{color:"aqua", fontSize:"80px", fontWeight:"bold", padding:"4px"}}>The Teencher</p> */}
        <form
          onSubmit={isSignUp ? handleSignUp : handleSignIn}
          className="text-center"
        >
          <p style={{ color: "aqua", fontSize: "30px", fontWeight: "bold" }}>
            {isSignUp ? "STUDENT SIGNUP" : "STUDENT LOGIN"}
          </p>
          {isSignUp && (
            <>
              <div className="text-center">
                <label htmlFor="name"></label>
                <input
                  className="text-center m-1 button-55 "
                  style={LoginStyle}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={credentials.name}
                  onChange={onChangeHander}
                  required
                />
                <label htmlFor="mobileNumber"></label>
                <input
                  className="text-center m-1 button-55"
                  style={LoginStyle}
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile nummber"
                  value={credentials.mobileNumber}
                  onChange={onChangeHander}
                  required
                />
              </div>
              <div className="text-center">
                <label htmlFor="schoolStandard"></label>
                <input
                  className="text-center m-1 button-55"
                  style={LoginStyle}
                  type="text"
                  name="schoolStandard"
                  placeholder="School Standard"
                  value={credentials.schoolStandard}
                  onChange={onChangeHander}
                  required
                />
                <label htmlFor="schoolBoard"></label>
                <input
                  className="text-center m-1 button-55"
                  style={LoginStyle}
                  type="text"
                  name="schoolBoard"
                  placeholder="School Board"
                  value={credentials.schoolBoard}
                  onChange={onChangeHander}
                  required
                />
              </div>
              <div className="text-center">
                <label htmlFor="city"></label>
                <input
                  className="text-center m-1 button-55"
                  style={LoginStyle}
                  type="text"
                  name="city"
                  placeholder="City"
                  value={credentials.city}
                  onChange={onChangeHander}
                  required
                />
                <label htmlFor="state"></label>
                <input
                  style={LoginStyle}
                  className="text-center m-1 button-55"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={credentials.state}
                  onChange={onChangeHander}
                  required
                />
              </div>
            </>
          )}
          <div className="text-center">
            <label htmlFor="email"></label>
            <input
              className="text-center m-1 button-55"
              style={LoginStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChangeHander}
              required
            />
          </div>
          <div className="text-center">
            <label htmlFor="password"></label>
            <input
              className="text-center m-1 button-55"
              style={LoginStyle}
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChangeHander}
              required
            />
          </div>
          <br />
          <button type="submit" className="button-07">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          <div>
            <p>
              {isSignUp ? (
                <>
                  <br />
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    Already have an account?{" "}
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  <br />
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    Don't have an account?{" "}
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
