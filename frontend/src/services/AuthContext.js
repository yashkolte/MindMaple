import React, { createContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState(null); // Store user information

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("access_token", tokenResponse.access_token);
      setAccessToken(tokenResponse.access_token);

      // Fetch user info from Google
      const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }).then((res) => res.json());

      console.log("User Info:", userInfo);
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      
      // Send user info to the backend to store it in the database
      await saveUserDataToBackend(userInfo);
    },
    onError: () => console.error("Login Failed"),
  });

  const saveUserDataToBackend = async (userInfo) => {
    try {
      const response = await axios.post("http://localhost:8080/users/adduser", userInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Send the token with the request
        },
      });
      console.log("User data saved:", response.data);
    } catch (error) {
      console.error("Error saving user data to backend:", error.response || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
    
  };

  useEffect(() => {
    // Load user data from localStorage on mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
