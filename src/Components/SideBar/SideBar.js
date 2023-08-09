/** @format */

import React, { useEffect, useState } from "react";

function SideBar() {
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const storageUsername = localStorage.getItem("m-auth-username");
    const token = localStorage.getItem("x-auth-token");

    if (token === null || token === undefined) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }

    setUsername(storageUsername);
  }, []);

  return (
    <div
      className={`sidebar h-screen flex flex-col w-96 pr-4 bg-gray-900 ${
        !showSidebar && "hidden"
      }`}
    >
      <div className="text-3xl font-bold p-4">SYMPHONIC</div>
      <div className="home p-3 mt-2.5 border">
        <a href={`/user/${username}/explore`} className="cursor-pointer">
          Home
        </a>
      </div>
      <div className="search-bar p-3 mt-2.5 border">
        <a href="/search" className="cursor-pointer">
          Search Music
        </a>
      </div>
      <div className="my-music p-3 mt-2.5 border">
        <a href={`/user/account/${username}`} className="cursor-pointer">
          My Music
        </a>
      </div>
      <div className="playlists mt-2.5 p-6">
        <hr />
        <ul>
          <li>My playlist</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
