/** @format */

import React, { useState, useEffect } from "react";
import baseUrl from "../../Utils/Axios";
import { useNavigate } from "react-router-dom";
import load from "../../Static/loading2.gif";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [responseMsg, setresponseMsg] = useState("Enter the credentials");
  const [pageLoad, setPageLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    const username = localStorage.getItem("m-auth-username");
    if (token !== null && (username !== null || username !== undefined)) {
      navigate(`/user/account/${username}`);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setPageLoad(true);
    async function loginData(userData) {
      const res = await baseUrl.post("user/login", userData);
      const data = res.data;
      console.log(res.status || "no response");
      if (res.status === 201) {
        console.log(data);
        localStorage.setItem("x-auth-token", data.token);
        localStorage.setItem("m-auth-username", data.username);
        navigate(`/user/account/${data.username}`);
      } else {
        setresponseMsg(data);
      }
    }

    const user = {
      userName: username,
      password: password,
    };
    loginData(user);
  }

  return (
    <div className="login relo-form">
      <h1 className="font-bold text-xl md:text-3xl md:p-3 md:mt-5">
        User Login
      </h1>
      {pageLoad ? (
        <div>
          <img
            src={load}
            alt="loading animation"
            className="w-1/3 loading-anime"
          />
        </div>
      ) : (
        <form
          action=""
          className="relo-form-form bg-black bg-opacity-60 rounded-sm md:p-5"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="intext">
            <span>Username</span>
            <input
              type="text"
              placeholder="User name"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          <div className="intext">
            <span>Password</span>
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between">
            <h1>
              don't have an account?{" "}
              <a href="/user/register" className="font-bold">
                sign up
              </a>
            </h1>
            <button
              type="submit"
              className="text-center font-bold border mt-8 p-2 lg:w-72 mr-auto ml-auto"
            >
              Login
            </button>
          </div>
        </form>
      )}
      <div className="res">{responseMsg}</div>
    </div>
  );
}

export default Login;
