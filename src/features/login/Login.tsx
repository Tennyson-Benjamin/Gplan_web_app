import React, { useEffect } from "react";
// import axiosInstance from '../axiosInstance';
import axios from "axios";
import Dashboard from "../inputGraphEditor/components/DashBoard";

function Login() {
  useEffect(() => {
    axios
      .post("https://api.gplan.in/auth/token/", {
        username: "bhavy",
        password: "Bhavy@goel17",
      })
      .then((resp) => {
        localStorage.setItem("access_token", resp.data.access);
        localStorage.setItem("refresh_token", resp.data.refresh);
        // console.log(resp);
      });
  }, []);

  return <Dashboard />;
}

export default Login;
