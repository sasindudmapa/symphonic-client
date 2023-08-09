import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//Utils
import baseUrl from "../../Utils/Axios";

//Static
import load from "../../Static/loading2.gif";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [passworwd, setPassworwd] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [userNameAvailability, setuserNameAvailability] = useState("");
  const [pageLoad, setPageLoad] = useState(false);

  const navigate = useNavigate();

  //check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    const username = localStorage.getItem("m-auth-username");
    // console.log(`token is ${typeof token}`);
    if (token !== null && (username !== null || username !== undefined)) {
      navigate(`/user/account/${username}`);
    }
  }, []);

  //to check whether the username exists already
  useEffect(() => {
    async function checkUserName(userName) {
      const res = await baseUrl.post("check/username", { userName });
      setuserNameAvailability(res.data);
    }

    checkUserName(userName);
  }, [userName]);

  //Handlings
  function handleFName(e) {
    setFullName(e.target.value);
  }

  function handleUname(e) {
    setUserName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassworwd(e.target.value);
  }

  function handleDateOfBirth(e) {
    console.log(e.target.value);
    setDateOfBirth(e.target.value);
  }

  function handleProfilePhoto(e) {
    setProfilePhoto(e.target.files[0]);
  }

  function handleCoverPhoto(e) {
    setCoverPhoto(e.target.files[0]);
  }

  //Form Submission
  function handleSubmit(e) {
    e.preventDefault();
    setPageLoad(true);

    //sending date to the backend
    async function sendUserDts(formData) {
      const res = await baseUrl.post("user/register", formData);
      localStorage.setItem("x-auth-token", res.data.token);
      localStorage.setItem("m-auth-username", userName);
      //changing the Response Text
      navigate(`/user/account/${res.data.user.name}`);
    }

    async function sendAuth(username, password) {
      const data = {
        username: username,
        password: password,
      };
      const res = await baseUrl.post("auth/register", data);
      if (res.status === 201) {
        // history.push("/user/login");
      }
    }

    if (
      userName === "" ||
      fullName === "" ||
      email === "" ||
      passworwd === "" ||
      profilePhoto === "" ||
      coverPhoto === ""
    ) {
      document.getElementsByClassName("res-text")[0].innerText =
        "Fill out all info";
    } else {
      //putting user data into a form
      const formData = new FormData();
      let nameLower = userName.toLowerCase();

      formData.append("fullName", fullName);
      formData.append("userName", userName);
      formData.append("nameInLower", nameLower);
      formData.append("email", email);
      formData.append("password", passworwd);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("userImages", profilePhoto);
      formData.append("userImages", coverPhoto);
      sendUserDts(formData);
      sendAuth(userName, passworwd);
    }
  }

  return (
    <div className="user-register relo-form">
      <h1 className="font-bold text-xl md:text-3xl md:p-3 md:mt-5">
        User Register
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
          className="relo-form-form bg-black bg-opacity-60 rounded-sm md:p-5"
          encType="multipart/form-data"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="intext">
            <span>Full Name</span>
            <input
              type="text"
              placeholder="Full Name"
              autoComplete={false}
              onChange={(e) => handleFName(e)}
            />
          </div>
          <div className="intext">
            <span>Username</span>
            <input
              type="text"
              placeholder="Username"
              autoComplete={false}
              onChange={(e) => handleUname(e)}
            />
          </div>
          <div className="intext">
            <span>Password</span>
            <input
              type="text"
              placeholder="Password"
              autoComplete={false}
              onChange={(e) => handlePassword(e)}
            />
          </div>
          <div className="intext">
            <span>Email</span>
            <input
              type="text"
              className=""
              placeholder="exaple@email.com"
              autoComplete={false}
              onChange={(e) => handleEmail(e)}
            />
          </div>
          <div className="intext">
            <span>Date Of Birth</span>
            <input
              type="date"
              placeholder="Full Name"
              autoComplete={false}
              onChange={(e) => handleDateOfBirth(e)}
            />
          </div>
          <div className="">
            <span>Profile Photo</span>
            <input
              type="file"
              // placeholder="Full Name"
              className=""
              autoComplete={false}
              onChange={(e) => handleProfilePhoto(e)}
            />
          </div>
          <div className="">
            <span>Cover Photo</span>
            <input
              type="file"
              // placeholder="Full Name"
              className=""
              autoComplete={false}
              onChange={(e) => handleCoverPhoto(e)}
            />
          </div>
          <div>
            <h1>
              Already have an account?{" "}
              <a href="/user/login" className="font-bold">
                Sign in
              </a>
            </h1>
            <button
              type="submit"
              className="text-center font-bold border mt-8 p-2 lg:w-72 mr-auto ml-auto"
            >
              Register
            </button>
          </div>
        </form>
      )}
      <div className="res-text"> </div>
      <div className="username-checkl">{userNameAvailability}</div>
    </div>
  );
}

export default Register;
