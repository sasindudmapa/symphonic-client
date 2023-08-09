/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseUrl, { mediaUrl } from "../../Utils/Axios";

//static assets
import plusImg from "../../Static/plus.png";
import Albums from "../Album/Albums";
import Mains from "./Mains";
import load from "../../Static/loading2.gif";

import "./AccountStyles.css";

function Account() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [access, setAccess] = useState(false);
  const [showData, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchingUserData(token, username) {
      const res = await baseUrl.get(`user/account/${token}/${username}`);
      const data = res.data;
      console.log(res);
      if (res.status === 201) {
        console.log(data);
        data.access === true ? setAccess(true) : setAccess(false);
        setUser(data);
        setShow(true);
      } else {
        console.log("there are errors");
        console.log(data);
        setAccess(undefined);
        setErrMsg(data);
      }
    }

    const token = localStorage.getItem("x-auth-token");
    fetchingUserData(token, username);
  }, []);

  //logout
  function logout() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("m-auth-username");
    navigate("/user/login");
  }

  //handle the visibility of settings
  function handleShowSetting() {
    setShowSettings(!showSettings);
  }

  return (
    <div className="account-page">
      {errMsg !== "" ? (
        <p className="err">{errMsg}</p>
      ) : (
        <div className="acc">
          {access === undefined ? (
            //err
            <h1>{errMsg}</h1>
          ) : (
            <div className="acc-accees">
              {showData === false ? (
                <img
                  src={load}
                  alt="loading animation"
                  className="w-1/3 loading-anime"
                />
              ) : (
                <div className="loaded">
                  <img
                    src={`${mediaUrl}${user.coverpic}`}
                    alt="cover"
                    className="object-cover w-screen h-32 sm:h-36 md:h-40 lg:h-60"
                  />
                  <div className="flex justify-between mx-12 md:mx-14 lg:mx-16">
                    <div className="left flex">
                      <img
                        src={`${mediaUrl}${user.propic}`}
                        alt="Profile"
                        className="pro-img mt-3 rounded-full h-24 md:h-28 lg:h-32"
                      />
                      <span className="mt-auto mb-auto ml-5">
                        <h1 className="user-name text-xl font-bold">
                          {user.username}
                        </h1>
                        <p className="fans opacity-75">
                          {user.fans} subscrbers
                        </p>
                      </span>
                    </div>
                    <div className="right relative flex justify-center items-center">
                      {/* <div className="acc-right-button"> */}
                      {access ? (
                        <div className="acc-right-button relative">
                          <img
                            src={plusImg}
                            alt="plus"
                            className="h-12 md:h-14 lg:h-16 mt-auto mb-auto cursor-pointer"
                            onClick={handleShowSetting}
                          />
                          {showSettings && (
                            <div className="plus-setting absolute top-0 -left-36">
                              <ul>
                                <li className="mt-3 border border-gray-300 rounded-sm p-2 text-white font-bold bg-gray-300 bg-opacity-25 hover:bg-opacity-40">
                                  <a
                                    href={`/user/${user.username}/account/upload/album`}
                                  >
                                    Upload an album
                                  </a>
                                </li>
                                <li className="mt-3 border border-gray-300 rounded-sm p-2 text-white font-bold bg-gray-300 bg-opacity-25 hover:bg-opacity-40">
                                  <a
                                    href={`/user/${user.username}/account/upload/song`}
                                  >
                                    Upload a song
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                          {access && (
                            <button onClick={logout} className="text-center">
                              Log out
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="acc-right-button bg-red-700 p-2 font-bold cursor-pointer">
                          Subscirbe
                        </p>
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                  {/* MAIN OF */}
                  <div className="main-ones mt-8">
                    <h1 className="text-center font-bold md:text-xl lg:text-2xl">
                      Songs
                    </h1>
                    <Mains username={username} />
                  </div>

                  {/* All ABUMS */}
                  <h1 className="text-center font-bold md:text-xl lg:text-2xl">
                    Albums
                  </h1>
                  <Albums username={user.username} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
