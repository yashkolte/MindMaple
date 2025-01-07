import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext"; // Ensure the correct path
import logo from "../assets/logo.png";
import logoutImg from "../assets/logout.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Access user info from AuthContext
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user && user.picture) {
      setProfilePicture(user.picture);
    }
  }, [user]);

  return (
    <nav className="container border-gray-200 dark:bg-gray-900 my-4 mx-auto fixed z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4 rounded-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-60 backdrop-saturate-100 backdrop-contrast-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10 invert" alt="Flowbite Logo" />
        </button>
        <div className="flex gap-4 items-center">
          {user && profilePicture ? (
            <img
              className="w-8 h-8 rounded-full"
              src={profilePicture} // User's profile picture
              alt="User"
            />
          ) : (
            <span></span> // Show a placeholder or loader
          )}

          {/* Display username */}
          <span className="text-black font-bold text-opacity-80 flex gap-4 items-center">
            {user?.name && <p>{user.name}</p>}
            {user === null || (
              <button onClick={logout}>
                <img className="h-5 opacity-70" src={logoutImg} alt="" />
              </button>
            )}
          </span>

          {user ? (
            <button
              onClick={() => navigate("/addTodo")}
              type="submit"
              className="flex justify-between gap-2 items-center mx-auto shadow-xl text-sm bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-900 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-2 pl-4 py-1 overflow-hidden border-2 rounded-full group"
            >
              Add Todo
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
          ) : (
            " "
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
