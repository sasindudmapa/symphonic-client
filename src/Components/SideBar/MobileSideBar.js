/** @format */

import React, { useEffect, useState } from "react";

function MobileSideBar() {
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const storageUsername = localStorage.getItem("m-auth-username");
    setUsername(storageUsername);

    const token = localStorage.getItem("x-auth-token");

    if (token === null || token === undefined) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, []);

  return (
    <div
      className={`mobile-sidebar flex justify-between w-screen ${
        !showSidebar && "hidden"
      }`}
    >
      <h1 className="p-3 font-bold text-lg">SYMPHONIC</h1>
      <div className="flex p-3 justify-evenly w-2/3">
        <div>
          <a href={`/user/${username}/explore`}>Home</a>
        </div>
        <div>
          <a href="/search">Search</a>
        </div>
        <div>
          <a href={`/user/account/${username}`}>Account</a>
        </div>
      </div>
    </div>
  );
}

export default MobileSideBar;
