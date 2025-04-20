import React, { useState } from "react";
import { SIGN_UP_URL, SIGN_IN_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoaderPopup from "./loader";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [isSignLoginSuccess, setisSignLoginSuccess] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    role: "",
    address: "",
    location: "",
    zipcode: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();
    setisSignLoginSuccess(true);
    const { username, email, number, password, role, location, zipcode } =
      signupData;

    if (
      !username ||
      !email ||
      !number ||
      !password ||
      !role ||
      !location ||
      !zipcode
    ) {
      setSignupError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setSignupError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }

    setSignupError("");

    try {
      const res = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();

      if (data?.token) {
        Cookies.set("token", data?.token);
        Cookies.set("role", data?.role);
        navigate("/user/jobs");
      }
    } catch (error) {
      alert("Signup failed ! Please try again");

      console.log(error);
    }
    setisSignLoginSuccess(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setisSignLoginSuccess(true);
    const { email, password } = loginData;

    if (!email || !password) {
      setLoginError("Both fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setLoginError("Invalid email format.");
      return;
    }

    setLoginError("");

    try {
      const res = await fetch(SIGN_IN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log(data);

      if (data?.token) {
        Cookies.set("token", data?.token);
        Cookies.set("role", data?.role);
        if (data?.role === "employee") navigate("/user/jobs");
        else navigate("/company/jobs-applied");
      }
    } catch (error) {
      alert("Login failed ! Please try again");
      console.log(error);
    }
    setisSignLoginSuccess(false);
  };

  return (
    <>
      {isSignLoginSuccess && <LoaderPopup />}
      <div className='main'>
        <input type='checkbox' id='chk' aria-hidden='true' />

        <div className='signup'>
          <form onSubmit={handleSignup}>
            <label htmlFor='chk' aria-hidden='true' className='cursor-ptr'>
              Sign up
            </label>
            <input
              type='text'
              placeholder='User name'
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
            <input
              type='email'
              placeholder='Email'
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
            <input
              type='number'
              placeholder='Number'
              value={signupData.number}
              onChange={(e) =>
                setSignupData({ ...signupData, number: e.target.value })
              }
              required
            />
            <input
              type='password'
              placeholder='Password'
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <select
              value={signupData.role}
              onChange={(e) =>
                setSignupData({ ...signupData, role: e.target.value })
              }
              required
            >
              <option value='Select Role' disabled hidden>
                Select Role
              </option>
              <option value='employee'>Employee</option>
              <option value='manager'>Manager</option>
            </select>

            <input
              type='text'
              placeholder='Address'
              value={signupData.address}
              onChange={(e) =>
                setSignupData({ ...signupData, address: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='Location'
              value={signupData.location}
              onChange={(e) =>
                setSignupData({ ...signupData, location: e.target.value })
              }
              required
            />
            <input
              type='text'
              placeholder='Zipcode'
              value={signupData.zipcode}
              onChange={(e) =>
                setSignupData({ ...signupData, zipcode: e.target.value })
              }
              required
            />
            {signupError && <p className='error'>{signupError}</p>}
            <button type='submit' className='cursor-ptr'>
              Sign up
            </button>
          </form>
        </div>

        <div className='login'>
          <form onSubmit={handleLogin}>
            <label htmlFor='chk' aria-hidden='true' className='cursor-ptr'>
              Login
            </label>
            <input
              type='email'
              placeholder='Email'
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
            <input
              type='password'
              placeholder='Password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            {loginError && <p className='error'>{loginError}</p>}
            <button type='submit' className='cursor-ptr'>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
