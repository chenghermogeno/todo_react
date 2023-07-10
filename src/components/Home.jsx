import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token") || "");
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/todo");
        } else {
            navigate("/login");
        }
      }, []);


  return (
    <div>Home</div>
  )
}

export default Home