/** @format */

import React from "react";

function HomePage() {
  return (
    <div className="home-start">
      <div className="ctrans">
        <h1 className="text-center text-3xl font-bold md:p-8 md:text-4xl lg:p-16 lg:text-6xl ">
          MUSICTAPE
        </h1>
        <p>
          <a href="/user/register" className="home-link p-2">
            Register
          </a>
        </p>
        <p>
          <a href="/user/login" className="home-link p-2">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
